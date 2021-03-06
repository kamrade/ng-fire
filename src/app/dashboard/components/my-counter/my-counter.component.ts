import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
// import { Increment, Decrement, Reset } from 'src/app/dashboard/store/actions/counter.action';

import * as fromStore from 'src/app/dashboard/store/actions/counter.action';

@Component({
  selector: 'app-my-counter',
  templateUrl: './my-counter.component.html',
  styleUrls: ['./my-counter.component.scss']
})
export class MyCounterComponent implements OnInit {

  count$: Observable<number>;

  constructor(private store: Store<{ count: number }>) {
    // TODO: unsubscribe?
    this.count$ = store.pipe( select('dashboard_counter') );
  }

  increment() {
    this.store.dispatch(new fromStore.Increment());
  }

  decrement() {
    this.store.dispatch(new fromStore.Decrement());
  }

  reset() {
    this.store.dispatch(new fromStore.Reset());
  }

  ngOnInit() {
  }

}
