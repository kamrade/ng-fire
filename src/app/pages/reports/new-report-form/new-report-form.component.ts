import { Component, OnInit } from '@angular/core';

import { FiredataService } from 'src/app/core/firedata.service';
import { AuthService } from 'src/app/core/auth.service';
import { EntityComplex } from 'src/app/core/entities/entity';
import { User } from 'src/app/core/user';

@Component({
  selector: 'app-new-report-form',
  templateUrl: './new-report-form.component.html',
  styleUrls: ['./new-report-form.component.scss']
})
export class NewReportFormComponent implements OnInit {

  currentUser: User;
  currentUserDisplayName: string;
  statuses: EntityComplex[];

  currentYear = new Date().getFullYear();

  constructor(
    private firedataService: FiredataService,
    private auth: AuthService) { }

  ngOnInit() {
    this.setManager();
  }

  setManager() {
    this.auth.user.subscribe(user => {
      this.currentUser = user;
      this.currentUserDisplayName = this.currentUser.displayName;
    });
  }

  resetForm(f) {
    f.resetForm({ manager: this.currentUserDisplayName, year: this.currentYear });
    // Здесь нужно установить еще менеджера сразу.
  }

  confirmForm(e, f) {
    e.preventDefault();

    if (f.value.status) {
      this.firedataService.getStatus(f.value.status);
    }

    if (f.value.region) {
      this.firedataService.getRegion(f.value.region);
    }

    this.resetForm(f);
  }

}
