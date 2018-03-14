import { Injectable } from '@angular/core';
import { Notification } from './notification.model';
import { NotificationState } from './notification.reducer';
import { AppState } from '../../app.reducer';
import { createSelector, Store } from '@ngrx/store';
import { NotificationAddAction, NotificationRemoveAction } from './notification.actions';

const notificationsStateSelector = (state: AppState) => state.notifications;
const notificationsSelector = createSelector(notificationsStateSelector, (notificationState: NotificationState) => notificationState.notifications);

@Injectable()
export class NotificationService {

  constructor(private store: Store<AppState>) {
  }

  get notifications() {
    return this.store.select(notificationsSelector);
  }

  public addNotification(notification: Notification) {
    this.store.dispatch(new NotificationAddAction(notification));
  }

  public close(notification: Notification) {
    this.store.dispatch(new NotificationRemoveAction(notification));
  }
}
