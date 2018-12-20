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

  statuses: EntityComplex[];
  regions: EntityComplex[];
  directions: EntityComplex[];
  responsibilities: EntityComplex[];
  facilities: EntityComplex[];
  equipments: EntityComplex[];

  currentYear = new Date().getFullYear();

  constructor(
    private firedataService: FiredataService,
    private auth: AuthService,
    public clientsService: ClientsService,
    private reportService: ReportsService) { }

  ngOnInit() {

    this.auth.user.subscribe(user => {
      this.currentUser = user;
      this.currentUserId = user.uid;
      this.currentUserDisplayName = this.currentUser.displayName;
    });

    this.firedataService.getEntity('status')
      .subscribe(val => this.statuses = val);
    this.firedataService.getEntity('region')
      .subscribe(val => this.regions = val);
    this.firedataService.getEntity('direction')
      .subscribe(val => this.directions = val);
    this.firedataService.getEntity('responsibility')
      .subscribe(val => this.responsibilities = val);
    this.firedataService.getEntity('facility')
      .subscribe(val => this.facilities = val);
    this.firedataService.getEntity('equipment')
      .subscribe(val => this.equipments = val);
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
