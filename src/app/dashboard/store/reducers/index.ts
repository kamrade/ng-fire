// import { ActionReducerMap } from '@ngrx/store';

import * as fromCounter from './counter.reducer';

export const reducers = {
  counter: fromCounter.counterReducer
}
