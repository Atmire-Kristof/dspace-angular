import { Action } from '@ngrx/store';
import { type } from '../ngrx/type';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const TruncatableActionTypes = {
  TOGGLE: type('dspace/truncatable/TOGGLE'),
  COLLAPSE: type('dspace/truncatable/COLLAPSE'),
  EXPAND: type('dspace/truncatable/EXPAND'),
};

export class TruncatableAction implements Action {
  id: string;
  type;
  constructor(name: string) {
    this.id = name;
  }
}

/* tslint:disable:max-classes-per-file */
export class TruncatableToggleAction extends TruncatableAction {
  type = TruncatableActionTypes.TOGGLE;
}

export class TruncatableCollapseAction extends TruncatableAction {
  type = TruncatableActionTypes.COLLAPSE;
}

export class TruncatableExpandAction extends TruncatableAction {
  type = TruncatableActionTypes.EXPAND;
}

/* tslint:enable:max-classes-per-file */
