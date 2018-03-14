import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { NotificationAction, NotificationActionTypes, NotificationRemoveAction } from './notification.actions';

@Injectable()
export class NotificationEffects {
  @Effect() timerEffect$ = this.actions$
    .ofType(NotificationActionTypes.ADD)
    .filter((action: NotificationAction) => action.notification.timeout > 0)
    .switchMap((action: NotificationAction) =>
        Observable.timer(action.notification.timeout)
          .map(() => new NotificationRemoveAction(action.notification))
    );

  constructor(private actions$: Actions) {

  }

}
