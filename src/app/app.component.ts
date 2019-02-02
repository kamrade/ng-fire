import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services';

import * as fromCoreStore from 'src/app/core/store';
import { EntityComplex } from 'src/app/models/entity';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  signed = false;
  statuses$: Observable<EntityComplex[]>;

  constructor(
    public auth: AuthService,
    private store: Store<any>,
  ) {}

  ngOnInit() {
    const userObject: any = this.auth.user;
    userObject.subscribe((u: any) => {
      if (u) {
        this.signed = true;

        // STATUSES STORE
        this.statuses$ = this.store.pipe(select<any>(fromCoreStore.getStatuses));
        this.store.dispatch(new fromCoreStore.LoadStatuses());

      } else {
        this.signed = false;
      }
    });
  }
}
