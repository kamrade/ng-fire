import { Action } from '@ngrx/store';
import { EntityComplex } from 'src/app/models/entity';

export enum ActionTypes {
  LoadStatuses        = '[Core Entities] Load Statuses',
  LoadStatusesFail    = '[Core Entities] Load Statuses Fail',
  LoadStatusesSuccess = '[Core Entities] Load Statuses Success'
}

export class LoadStatuses implements Action {
  readonly type = ActionTypes.LoadStatuses;
}

export class LoadStatusesFail implements Action {
  readonly type = ActionTypes.LoadStatusesFail;
  constructor(public payload: any) {}
}

export class LoadStatusesSuccess implements Action {
  readonly type = ActionTypes.LoadStatusesSuccess;
  constructor(public payload: EntityComplex[]) {}
}

export type StatusesAction = LoadStatuses | LoadStatusesFail | LoadStatusesSuccess;
