import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NotificationService } from "./notification.service";
import { Notification } from "./Notification";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'ds-notification',
  styleUrls: ['./notification.component.scss'],
  templateUrl: './notification.component.html'
})
export class NotificationComponent implements OnDestroy, OnInit {

  notifications: Observable<Array<Notification>>;

  hidden: boolean;

  constructor(private notificationService: NotificationService) {
    this.notifications = notificationService.notifications;
  }

  ngOnInit() {

  }

  close(notification: Notification) {
    this.notificationService.close(notification);
  }

  ngOnDestroy() {

  }

}
