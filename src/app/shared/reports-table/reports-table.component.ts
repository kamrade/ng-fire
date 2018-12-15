import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// SERVICES
import { AuthService } from 'src/app/core/auth.service';
import { ReportsService } from 'src/app/core/reports.service';
import { ClientsService } from 'src/app/core/clients.service';

// CLASSES & INTERFACES
import { Report, ReportComplex } from 'src/app/core/report';
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

  constructor(
    private authService: AuthService,
    private reportsService: ReportsService,
    public clientsService: ClientsService
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
                this.reports.map((report, i) => {
                  this.clients[report.data.client] = this.clientsService.getClientById(report.data.client);
                });
                console.log(this.clients);

                this.clients[ Object.keys(this.clients)[0] ].subscribe(cl => console.log(cl));
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
