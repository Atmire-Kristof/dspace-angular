import {Injectable} from "@angular/core";
import {Notification} from "./Notification";
import {Observable} from "rxjs/Observable";
import {NotificationState} from "./notification.reducer";
import {AppState} from "../../app.reducer";
import {createSelector, Store} from "@ngrx/store";
import {NotificationAddAction, NotificationRemoveAction} from "./notification.actions";

const notificationsStateSelector = (state: AppState) => state.notifications;
const notificationsSelector = createSelector(notificationsStateSelector, (notificationState: NotificationState) => notificationState.notifications);

@Injectable()
export class NotificationService {
  notifications: Observable<Array<Notification>>;

  constructor(private store: Store<AppState>) {
    this.notifications = this.store.select(notificationsSelector);
  }

  public addNotification(notification: Notification) {
    this.store.dispatch(new NotificationAddAction(notification));
  }

  public addNotificationWithTimeout(notification: Notification, time: number) {
    this.addNotification(notification);
    setTimeout(()=>{
      this.close(notification);
    }, time);
  }

  public close(notification: Notification) {
    this.store.dispatch(new NotificationRemoveAction(notification));
  }
}
