import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { NotificationService } from './notification.service';
import { Observable } from 'rxjs/Observable';
import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NotificationAddAction, NotificationRemoveAction } from './notification.actions';
import { Notification, Builder } from './notification.model';

describe('NotificationService', () => {
  let service: NotificationService;
  const store: Store<AppState> = jasmine.createSpyObj('store', {
    /* tslint:disable:no-empty */
    dispatch: {},
    /* tslint:enable:no-empty */
    select: Observable.of(true)
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Store, useValue: store
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    service = new NotificationService(store);
  });

  describe('when addNotification is called',() => {
    let message: string;
    let timeout: number;
    let notification: Notification;

    beforeEach(() => {
      message = 'test message';
      timeout = 50;
      notification = Notification.getBuilder(message).timeout(timeout).build();

      service.addNotification(notification);
    });

    it('should dispatch NotificationAddAction to the store', () => {
      expect(store.dispatch).toHaveBeenCalledWith(new NotificationAddAction(notification));
    });

    it('should call close after x milliseconds', () => {
      expect(store.dispatch).not.toHaveBeenCalledWith(new NotificationRemoveAction(notification));
      setTimeout(()=>{
        expect(store.dispatch).toHaveBeenCalledWith(new NotificationRemoveAction(notification));
      }, timeout+1);
    });
  });

  describe('when close is called',() => {
    let message: string;
    let notification: Notification;

    beforeEach(() => {
      message = 'test message';
      notification = new Notification(message);

      service.close(notification);
    });

    it('should dispatch NotificationRemoveAction to the store', () => {
      expect(store.dispatch).toHaveBeenCalledWith(new NotificationRemoveAction(notification));
    });
  });

});
