import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  count$: Observable<number>;

  constructor(
    public auth: AuthService,
    private store: Store<{ count: number }>
  ) {
    this.count$ = this.store.pipe( select('dashboard_counter') );
  }

  ngOnInit() {
  }

}
