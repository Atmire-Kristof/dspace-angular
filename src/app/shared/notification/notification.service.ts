import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Notification} from "./Notification";

@Injectable()
export class NotificationService {
  notifications: Array<Notification>;
  notificationChange: Subject<Array<Notification>> = new Subject<Array<Notification>>();

  constructor() {
    this.notifications = [];
  }

  public addNotification(notification: Notification) {
    this.notifications.push(notification);
    this.update();
  }

  public addNotificationWithTimeout(notification: Notification, time: number) {
    this.addNotification(notification);
    setTimeout(()=>{
      this.close(notification);
    }, time);
  }

  public close(notification: Notification) {
    let index = this.notifications.indexOf(notification);
    this.notifications.splice(index, 1);
    this.update();
  }

  update() {
    this.notificationChange.next(this.notifications);
  }
}
