import * as fromStatuses from '../actions/statuses.action';
import { EntityComplex } from 'src/app/models/entity';

export interface StatusesState {
  data:    EntityComplex[];
  loaded:  boolean;
  loading: boolean;
}

export const initialState: StatusesState = {
  data:    [{
    id: 'completed',
    data: {
      title: 'Completed',
      abbr: 'cpl',
      description: 'Finished, done'
    }
  }, {
    id: 'on_hold',
    data: {
      title: 'On hold',
      abbr: 'hld',
      description: ''
    }
  }],
  loaded:  false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromStatuses.StatusesAction
): StatusesState {

  switch (action.type) {

    case fromStatuses.ActionTypes.LoadStatuses: {
      return {
        ...state,
        loading: true
      };
    }

    case fromStatuses.ActionTypes.LoadStatusesSuccess: {
      console.log(action.payload);
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

export const getStatusesLoading = (state: StatusesState) => state.loading;
export const getStatusesLoaded  = (state: StatusesState) => state.loaded;
export const getStatuses        = (state: StatusesState) => state.data;
