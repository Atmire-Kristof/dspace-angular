import {Notification} from "./Notification";
import {NotificationAction, NotificationActionTypes} from "./notification.actions";

export interface NotificationState {
  notifications: Array<Notification>;
}

const initialState: NotificationState = {
  notifications: []
}

export function notificationReducer(state = initialState, action: NotificationAction): NotificationState {
  switch(action.type) {

    case NotificationActionTypes.ADD: {
      let notifications = state.notifications.push(action.notification);
      return Object.assign({}, state, {
        notifications: notifications
      });
    }

    case NotificationActionTypes.REMOVE: {
      let index = state.notifications.indexOf(action.notification);
      let notifications = state.notifications.splice(index, 1);
      return Object.assign({}, state, {
        notifications: notifications
      });
    }

  }
}
