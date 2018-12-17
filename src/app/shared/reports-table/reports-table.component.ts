import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// SERVICES
import { AuthService } from 'src/app/core/auth.service';
import { ReportsService } from 'src/app/core/reports.service';
import { ClientsService } from 'src/app/core/clients.service';
import { FiredataService } from 'src/app/core/firedata.service';

// CLASSES & INTERFACES
import { Report, ReportComplex, reportColumns } from 'src/app/core/report';
import { Client, ClientComplex } from 'src/app/core/client';
import { Roles } from 'src/app/core/user';

// ---
@Component({
  selector: 'app-reports-table',
  templateUrl: './reports-table.component.html',
  styleUrls: ['./reports-table.component.scss']
})
export class ReportsTableComponent implements OnInit, OnDestroy {

  destroy$ = new Subject();

  userId: string;
  userName: string;
  userRoles: Roles;

  reports: ReportComplex[];

  clients = {};

  directions = {};
  equipments = {};
  facilities = {};
  regions = {};
  responsibilities = {};
  statuses = {};

  reportColumns = reportColumns;

  constructor(
    private authService: AuthService,
    private reportsService: ReportsService,
    public clientsService: ClientsService,
    public firedataService: FiredataService
  ) {

    this.authService.user
      .pipe( takeUntil(this.destroy$) )
      .subscribe(user => {
        if (user) {
          this.userId    = user.uid;
          this.userRoles = user.roles;
          this.userName  = user.displayName;
          if (this.userRoles.admin) {
            this.reportsService.getReportsWithIDs$()
              .pipe( takeUntil(this.destroy$) )
              .subscribe(reports => {

                this.reports = reports;
                this.reports.map((report) => {
                  let directionId = report.data.direction;
                  let equipmentId = report.data.equipment;
                  let facilityId = report.data.facility;
                  let regionId = report.data.region;
                  let responsibilityId = report.data.responsibility;
                  let statusId = report.data.status;
                  let clientId = report.data.client;

                  this.firedataService.getEntityById('direction', directionId)
                    .subscribe(item => this.directions[report.data.direction] = item.title);
                  this.firedataService.getEntityById('equipment', equipmentId)
                    .subscribe(item => this.equipments[report.data.equipment] = item.title);
                  this.firedataService.getEntityById('facility', facilityId)
                    .subscribe(item => this.facilities[report.data.facility] = item.title);
                  this.firedataService.getEntityById('region', regionId)
                    .subscribe(item => this.regions[report.data.region] = item.title);
                  this.firedataService.getEntityById('responsibility', responsibilityId)
                    .subscribe(item => this.responsibilities[report.data.responsibility] = item.title);
                  this.firedataService.getEntityById('status', statusId)
                    .subscribe(item => this.statuses[report.data.status] = item.title );

                  this.clientsService.getClientById(clientId)
                    .subscribe(cl => {
                      this.clients[report.data.client] = cl.title;
                    });
                });

              })

          } else {

            this.reportsService.getReportsForCurrentUser$(this.userId)
              .pipe( takeUntil(this.destroy$) )
              .subscribe(reports => {
                this.reports = reports;
              });
          }
        }
      });
  }

  ngOnInit() {
  }

  renderCell(currentData, column) {
    if (column === 'client') {
      return this.getClientTitle( currentData[column] );
    }
    if (column === 'status') {
      return this.statuses[currentData[column]];
    }
    if (column === 'direction') {
      return this.directions[currentData[column]];
    }
    if (column === 'equipment') {
      return this.equipments[currentData[column]];
    }
    if (column === 'facility') {
      return this.facilities[currentData[column]];
    }
    if (column === 'region') {
      return this.regions[currentData[column]];
    }
    if (column === 'responsibility') {
      return this.responsibilities[currentData[column]];
    }
    return currentData[column];
  }

  getClientTitle(clientId: string): string {
    return this.clients[clientId];
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
