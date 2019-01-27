import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromStatuses from './statuses.reducer';

export interface CoreState {
  statuses: fromStatuses.StatusesState;
}

export const reducers: ActionReducerMap<CoreState> = {
  statuses: fromStatuses.reducer
};

export const getCoreState     = createFeatureSelector<CoreState>('core');

export const getStatusesState = createSelector(
  getCoreState,
  (state: CoreState) => state.statuses
);

export const getStatuses        = createSelector(getStatusesState, fromStatuses.getStatuses);
export const getStatusesLoaded  = createSelector(getStatusesState, fromStatuses.getStatusesLoaded);
export const getStatusesLoading = createSelector( getStatusesState, fromStatuses.getStatusesLoading);
