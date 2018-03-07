import { Action } from '@ngrx/store';
import { Notification } from './notification.model';

import { type } from '../ngrx/type';

export const NotificationActionTypes = {
  ADD: type('dspace/notification/ADD'),
  REMOVE: type('dspace/notification/REMOVE')
};

/* tslint:disable:max-classes-per-file */
export class NotificationAction implements Action {
  notification: Notification;
  type;

  constructor(notification: Notification) {
    this.notification = notification;
  }
}

export class NotificationAddAction extends NotificationAction {
  type = NotificationActionTypes.ADD;
}

export class NotificationRemoveAction extends NotificationAction {
  type = NotificationActionTypes.REMOVE;
}
