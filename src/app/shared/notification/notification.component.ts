import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NotificationService } from "./notification.service";
import { Notification } from "./Notification";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'ds-notification',
  styleUrls: ['./notification.component.scss'],
  templateUrl: './notification.component.html'
})
export class NotificationComponent implements OnDestroy, OnInit {

  notifications: Array<Notification>;
  subscription: Subscription;

  hidden: boolean;

  constructor(private notificationService: NotificationService) {
    this.notifications = notificationService.notifications;
    this.subscription = notificationService.notificationChange.subscribe((value)=>{
      this.notifications = value;
    });
  }

  ngOnInit() {

  }

  close(notification: Notification) {
    this.notificationService.close(notification);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
