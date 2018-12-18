import { Component, OnInit } from '@angular/core';

import { Subject, Observable, from } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from 'src/app/core/auth.service';
import { ClientsService } from 'src/app/core/clients.service';
import { FiredataService } from 'src/app/core/firedata.service';
import { ReportsService } from 'src/app/core/reports.service';

import { Client, ClientComplex } from 'src/app/core/client';
import { Entity, EntityComplex } from 'src/app/core/entities/entity';
import { Report, ReportComplex, reportColumns } from 'src/app/core/report';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {

  destroy$ = new Subject();
  reports: ReportComplex[];
  reportsUp = [];
  isLoading = true;
  reportColumns = reportColumns;
  title1 = new Subject();

  constructor(
    private authService: AuthService,
    private clientsService: ClientsService,
    private firedataService: FiredataService,
    private reportsService: ReportsService) {

      this.reportsService.getReportsWithIDs$()
        .pipe( takeUntil(this.destroy$) )
        .subscribe(reports => {

          console.log(':: get reports');
          this.reports = reports;
          this.isLoading = false;

          this.reports.forEach(report => {
            let client = new Subject;
            let status = new Subject;

            this.getStatus(report.data.status)
              .subscribe(statusObject => {
                status.next(statusObject.data().title);
              });

            from(this.getClientById(report.data.client))
              .subscribe(clientObject => {
                client.next(clientObject.data().title);
              });

            this.reportsUp.push({
              ...report.data,
              client,
              status
            });

          });

          console.log(this.reportsUp);

          from(this.getClientById(this.reports[0].data.client))
            .subscribe(client => {
              this.title1.next(client.data().title);
            });



        }, err => console.log('::err', err));
    }

  ngOnInit() {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getClientById(id: string): Observable<any> {
    return this.clientsService.getClientById(id);
  }

  getStatus(id: string): Observable<any> {
    return this.firedataService.getStatus(id);
  }

  renderCell(report, th) {
    return from([ report[th] ]);
  }

}