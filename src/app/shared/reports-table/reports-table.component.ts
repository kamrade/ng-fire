import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, iif } from 'rxjs';
import { takeUntil, filter, tap, switchMap } from 'rxjs/operators';

// SERVICES
import { AuthService } from 'src/app/core/auth.service';
import { ReportsService } from 'src/app/core/reports.service';
import { ClientsService } from 'src/app/core/clients.service';

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
    public clientsService: ClientsService
  ) {

    const combined = this.authService.user.pipe(
      takeUntil(this.destroy$),
      filter(user => !!user),
      switchMap((user) =>
        iif(
          () => !!user.roles.admin,
          this.reportsService.getReportsWithIDs$(),
          this.reportsService.getReportsForCurrentUser$(user.uid)
        )
      ),
      tap(reports => console.log(reports))
    )

    combined.subscribe();
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
