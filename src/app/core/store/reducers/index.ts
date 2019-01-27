import { ActionReducerMap } from '@ngrx/store';

import * as fromStatuses from './statuses.reducer';

export interface CoreState {
  statuses: fromStatuses.StatusesState
}

export const reducers: ActionReducerMap<CoreState> = {
  statuses: fromStatuses.reducer
}
