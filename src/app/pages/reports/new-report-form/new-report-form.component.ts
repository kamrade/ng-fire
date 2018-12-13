import { Component, OnInit } from '@angular/core';

import { FiredataService } from 'src/app/core/firedata.service';
import { AuthService } from 'src/app/core/auth.service';
import { StatusComplex } from 'src/app/core/status';
import { User } from 'src/app/core/user';

@Component({
  selector: 'app-new-report-form',
  templateUrl: './new-report-form.component.html',
  styleUrls: ['./new-report-form.component.scss']
})
export class NewReportFormComponent implements OnInit {

  currentUser: User;
  currentUserDisplayName: string;
  statuses: StatusComplex[];

  constructor(
    private firedataService: FiredataService,
    private auth: AuthService) { }

  ngOnInit() {
    this.auth.user.subscribe(user => {
      this.currentUser = user;
      this.currentUserDisplayName = this.currentUser.displayName;
    });
  }

  resetForm(f) {
    f.reset();
  }

  confirmForm(e, f) {
    e.preventDefault();

    if (f.value.status) {
      this.firedataService.getStatus(f.value.status);
    }

    if (f.value.region) {
      this.firedataService.getRegion(f.value.region);
    }

    f.reset();
  }

}
