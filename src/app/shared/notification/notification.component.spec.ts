import { NotificationService } from './notification.service';
import { NotificationComponent } from './notification.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Notification } from './notification.model';
import { Observable } from 'rxjs/Observable';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('NotificationComponent', () => {
  let comp: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;
  let notificationService: NotificationService;

  const notificationServiceStub = {
    get notifications() {
      return Observable.of([]);
    },
    addNotification: (notification: Notification)=>{},
    close: (notification: Notification)=>{}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, NgbModule.forRoot(), BrowserAnimationsModule],
      declarations: [NotificationComponent],
      providers: [
        { provide: NotificationService, useValue: notificationServiceStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
    notificationService = (comp as any).notificationService;
  });

  describe('when adding a notification', () => {
    beforeEach(() => {
      spyOn(notificationService, 'addNotification').and.callFake((notification: Notification)=>{
        notificationService.notifications.subscribe((value) => {
          value.push(notification);
        });
      });
      notificationService.addNotification(new Notification('test message'));
    });

    it('should be updated in the component',() => {
      comp.notifications.subscribe((value) => {
        expect(value.length).toBeGreaterThan(0);
      });
    });
  });

  describe('when adding a custom notification', () => {
    let message: HTMLElement;
    let alert: HTMLElement;
    let title: HTMLElement;

    let messageString: string;
    let typeString: string;
    let titleString: string;
    let notification: Notification;

    beforeEach(()=>{
      messageString = 'test message';
      typeString = 'danger';
      titleString = 'test title';
      notification =
        Notification
          .getBuilder(messageString)
          .type(typeString)
          .title(titleString)
          .dismissible(false)
          .build();
      notificationService.notifications.subscribe((value) => {
        value.push(notification);
      });

      fixture.detectChanges();

      message = fixture.debugElement.query(By.css('label')).nativeElement;
      title = fixture.debugElement.query(By.css('h3')).nativeElement;
      alert = fixture.debugElement.query(By.css('div.alert')).nativeElement;
    });

    it('should show a message',()=>{
      expect(message.textContent).toContain(messageString);
    });

    it('should show a title',()=>{
      expect(title.textContent).toContain(titleString);
    });

    it('should be the correct type',()=>{
      expect(alert.classList).toContain('alert-'+typeString);
    });

    it('should not be dismissible',()=>{
      expect(alert.classList).not.toContain('alert-dismissible');
    });
  });

  describe('when closing a notification', () => {
    let notification: Notification;

    beforeEach(() => {
      // Add a notification to remove afterwards
      notification = new Notification('test message');
      notificationService.notifications.subscribe((value)=>{
        value.push(notification);
      });

      // Create a spy for the close method in notificationService
      spyOn(notificationService, 'close').and.callFake((notification: Notification)=>{
        notificationService.notifications.subscribe((value)=>{
          let index = value.indexOf(notification);
          value.splice(index, 1);
        });
      });

      fixture.detectChanges();
    });

    it('should be updated in the component through the service',() => {
      // Check if the notification got added
      comp.notifications.subscribe((value) => {
        expect(value.length).toBe(1);
      });

      // Close the notification via the component
      // This will call the service
      comp.close(notification);

      // Check if the notification is gone
      comp.notifications.subscribe((value) => {
        expect(value.length).toBe(0);
      });
    });

    it('should be removed on click',() => {
      let button = fixture.debugElement.query(By.css('button.close'));
      button.triggerEventHandler('click', null);

      fixture.detectChanges();

      comp.notifications.subscribe((value) => {
        expect(value.length).toBe(0);
      });
    });
  });
});
