import { Component, OnInit } from '@angular/core';
import { NotificationService } from './notification.service';
import { Notification } from './notification.model';
import { Observable } from 'rxjs/Observable';
import {fadeInOut} from '../animations/fade';

@Component({
  selector: 'ds-notification',
  styleUrls: ['./notification.component.scss'],
  templateUrl: './notification.component.html',
  animations: [fadeInOut]
})
export class NotificationComponent implements OnInit {

  notifications: Observable<Notification[]>;

  hidden: boolean;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notifications = this.notificationService.notifications;
  }

  close(notification: Notification) {
    this.notificationService.close(notification);
  }
}
