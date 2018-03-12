import { NotificationAction, NotificationAddAction, NotificationRemoveAction } from './notification.actions';
import { notificationReducer, NotificationState } from './notification.reducer';
import { Notification } from './notification.model';

class NullAction extends NotificationAddAction {
  type = null;

  constructor() {
    super();
  }
}

describe('notificationReducer', () => {

  let initialState: NotificationState;
  let nullAction: NotificationAction;

  beforeEach(() => {
    initialState = { notifications: [] };
    nullAction = new NullAction();
  });

  it('should return the current state when no valid actions have been made', () => {
    const newState = notificationReducer(initialState, nullAction);

    expect(newState).toEqual(initialState);
  });

  it('should start with an empty array', () => {
    const newState = notificationReducer(undefined, nullAction);

    // The search sidebar starts collapsed
    expect(newState.notifications).toEqual([]);
  });

  it('should add a notification in response to the ADD action', () => {
    const message = 'test notification';
    const notification = new Notification(message);
    const addAction = new NotificationAddAction(notification);
    const newState = notificationReducer(initialState, addAction);

    expect(newState.notifications[0].message).toEqual(message);
  });

  it('should remove a notification in response to the REMOVE action', () => {
    const message = 'test notification';
    const notification = new Notification(message);
    const removeAction = new NotificationRemoveAction(notification);
    const state = { notifications: [ notification ] };
    const newState = notificationReducer(state, removeAction);

    expect(newState.notifications).toEqual([]);
  });

});
