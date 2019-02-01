import { StatusesState } from 'src/app/core/store/reducers/statuses.reducer';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromCoreStore from 'src/app/core/store';
import { EntityComplex } from 'src/app/models/entity';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  count$: Observable<number>;
  statuses$: Observable<EntityComplex[]>;

  constructor(
    public auth: AuthService,
    // private store: Store<fromCoreStore.CoreState>,
    private store: Store<any>
  ) {
    this.count$ = this.store.pipe( select('dashboard_counter') );
  }

  ngOnInit() {
    // this.store.pipe( select<any>('core') ).subscribe(state => {
    //   console.log(state);
    // });
    this.statuses$ = this.store.pipe( select<any>( fromCoreStore.getStatuses ) );
    this.store.dispatch(new fromCoreStore.LoadStatuses());
  }

}
