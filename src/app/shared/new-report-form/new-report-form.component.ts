import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { FiredataService } from 'src/app/core/firedata.service';
import { AuthService } from 'src/app/core/auth.service';
import { ClientsService } from 'src/app/core/clients.service';
import { ReportsService } from 'src/app/core/reports.service';

import { EntityComplex } from 'src/app/models/entity';
import { User } from 'src/app/core/user';
import { Report } from 'src/app/models/report';

@Component({
  selector: 'app-new-report-form',
  templateUrl: './new-report-form.component.html',
  styleUrls: ['./new-report-form.component.scss']
})
export class NewReportFormComponent implements OnInit {

  @Output() cancel = new EventEmitter();

  currentUser: User;
  currentUserId: string;
  currentUserDisplayName: string;

  currentYear = new Date().getFullYear();

  constructor(
    // private firedataService: FiredataService,
    private auth: AuthService,
    public clientsService: ClientsService,
    private reportService: ReportsService) { }

  ngOnInit() {
    this.auth.user.subscribe(user => {
      this.currentUser = user;
      this.currentUserId = user.uid;
      this.currentUserDisplayName = this.currentUser.displayName;
    });
  }

  hideForm() {
    this.cancel.emit();
  }

  resetForm(f) {
    f.resetForm({ manager: this.currentUserDisplayName, year: this.currentYear });
  }

  confirmForm(e, f) {
    e.preventDefault();

    let reportData: Report = {
      ...f.value,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      createdBy: this.currentUserId
    }

    this.reportService.create$(reportData);

    this.resetForm(f);
  }

}
