import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as statusesActions from 'src/app/core/store/actions/statuses.action';
import { FiredataService } from 'src/app/core/firedata.service';

@Injectable()
export class StatusesEffects {
  constructor(
    private actions$: Actions,
    private firedataService: FiredataService
  ) {}

  @Effect()
  loadStatuses$ = this.actions$
    .pipe(ofType(statusesActions.ActionTypes.LoadStatuses))
    .pipe(switchMap(() => {
      return this.firedataService.getEntity('status').pipe(
        map(statuses => new statusesActions.LoadStatusesSuccess(statuses))
      );
    }));
}
