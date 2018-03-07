import { Notification } from './notification.model';
import { NotificationAction, NotificationActionTypes } from './notification.actions';

export interface NotificationState {
  notifications: Notification[];
}

const initialState: NotificationState = {
  notifications: new Array<Notification>()
}

export function notificationReducer(state = initialState, action: NotificationAction): NotificationState {
  switch (action.type) {

    case NotificationActionTypes.ADD: {
      const notifications = [...state.notifications, action.notification];
      return Object.assign({}, state, {
        notifications: notifications
      });
    }

    case NotificationActionTypes.REMOVE: {
      const notifications = state.notifications.filter((notification) => notification !== action.notification);
      return Object.assign({}, state, {
        notifications: notifications
      });
    }

    default: {
      return state;
    }

  }
}
