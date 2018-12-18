import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, iif } from 'rxjs';
import { takeUntil, filter, tap,switchMap, map } from 'rxjs/operators';

// SERVICES
import { AuthService } from 'src/app/core/auth.service';
import { ReportsService } from 'src/app/core/reports.service';
import { ClientsService } from 'src/app/core/clients.service';
import { FiredataService } from 'src/app/core/firedata.service';

// CLASSES & INTERFACES
import { ReportComplex, reportColumns } from 'src/app/core/report';
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

  reportColumns = reportColumns;

  constructor(
    private authService: AuthService,
    private reportsService: ReportsService,
    public clientsService: ClientsService,
    public firedataService: FiredataService
  ) {

    this.firedataService.statuses

    this.authService.user
      .pipe(
        takeUntil(this.destroy$),
        filter(user => !!user),
        tap(user => {
          this.userId    = user.uid;
          this.userRoles = user.roles;
          this.userName  = user.displayName;
        }),
        switchMap(() =>
          iif(
            () => !!this.userRoles.admin,
            this.reportsService.getReportsWithIDs$(),
            this.reportsService.getReportsForCurrentUser$(this.userId)
          )
        ),
        tap((reports) => {
          this.reports = reports;
        }),
        switchMap(() => {
          return this.firedataService.statuses
        }),
        map(statuses => {
          return this.reports.map(report => {
            return {
              data: {
                ...report.data,
                status: statuses.filter(status => status.id === report.data.status)[0].data.title
              },
              id: report.id
            }
          });
        }))
      .subscribe(reports => {
        this.reports = reports;
      });
  }

  ngOnInit() {
  }

  renderCell(currentData, column) {
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
