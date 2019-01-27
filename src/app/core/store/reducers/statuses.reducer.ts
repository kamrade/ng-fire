import * as fromStatuses from '../actions/statuses.action';
import { EntityComplex } from 'src/app/models/entity';

export interface StatusesState {
  data:    EntityComplex[],
  loaded:  boolean,
  loading: boolean
}

export const initialState: StatusesState = {
  data:    [],
  loaded:  false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromStatuses.StatusesAction
): StatusesState {

  switch(action.type) {

    case fromStatuses.ActionTypes.LoadStatuses: {
      return {
        ...state,
        loading: true
      };
    }

    case fromStatuses.ActionTypes.LoadStatusesSuccess: {
      return {
        ...state,
        loading: false,
        loaded:  true
      };
    }

    case fromStatuses.ActionTypes.LoadStatusesFail: {
      return {
        ...state,
        loading: false,
        loaded:  false
      };
    }

  }

  return state;
}
