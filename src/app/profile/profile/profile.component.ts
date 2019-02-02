import { StatusesState } from 'src/app/core/store/reducers/statuses.reducer';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    public auth: AuthService,
  ) {}

  ngOnInit() {}

}
