import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, iif } from 'rxjs';
import { takeUntil, filter, tap, switchMap, map, zip } from 'rxjs/operators';

// SERVICES
import { AuthService } from 'src/app/core/auth.service';
import { ReportsService } from 'src/app/core/reports.service';
import { FiredataService } from 'src/app/core/firedata.service';

// CLASSES & INTERFACES
import { ReportComplex, reportColumns } from 'src/app/models/report';
import { EntityComplex } from 'src/app/models/entity';

// ---
@Component({
  selector: 'app-reports-table',
  templateUrl: './reports-table.component.html',
  styleUrls: ['./reports-table.component.scss']
})
export class ReportsTableComponent implements OnInit, OnDestroy {

  destroy$ = new Subject();

  reports: ReportComplex[];
  statuses$: Observable<EntityComplex[]>;
  statuses: EntityComplex[];

  collectedReports: any[] = [];

  reportColumns = reportColumns;

  constructor(
    private authService: AuthService,
    private reportsService: ReportsService,
    private firedataService: FiredataService
  ) {

    console.log('begin');

    const combined = this.authService.user.pipe(
      takeUntil(this.destroy$),
      filter(user => !!user),
      switchMap(user =>
        iif(
          () => !!user.roles.admin,
          this.reportsService.getReportsWithIDs$(),
          this.reportsService.getReportsForCurrentUser$(user.uid)
        )
      ),
      tap(reports => {
        this.reports = reports;
        this.collectedReports = [];
      }),
      zip(
        this.firedataService.getEntity('status'),
        this.firedataService.getEntity('region'),
        this.firedataService.getEntity('direction'),
        this.firedataService.getEntity('responsibility'),
        this.firedataService.getEntity('facility'),
        this.firedataService.getEntity('equipment')
      ),
      tap(allData => {
        console.log(allData);
        this.reports.map(report => {
          this.collectedReports.push({
            id: report.id,
            statusTitle: allData[1].find(el => el.id === report.data.status).data.title,
            regionTitle: allData[2].find(el => el.id === report.data.region).data.title,
            directionTitle: allData[3].find(el => el.id === report.data.direction).data.title,
            responsibilityTitle: allData[4].find(el => el.id === report.data.responsibility).data.title,
            facilityTitle: allData[5].find(el => el.id === report.data.facility).data.title,
            equipmentTitle: allData[6].find(el => el.id === report.data.equipment).data.title,
            data: report.data
          })
        })
      })
    )
    combined.subscribe(
      () => {
        console.log('OK')
      },
      err => console.log('ERR', err),
      () => console.log('COMPLETED')
    );

    console.log('end');
  }

  ngOnInit() {}

  renderCell(currentData, column) {
    if (column === 'status') {
      return currentData.statusTitle;
    }
    if (column === 'region') {
      return currentData.regionTitle;
    }
    if (column === 'direction') {
      return currentData.directionTitle;
    }
    if (column === 'responsibility') {
      return currentData.responsibilityTitle;
    }
    if (column === 'facility') {
      return currentData.facilityTitle;
    }
    if (column === 'equipment') {
      return currentData.equipmentTitle;
    }

    return currentData.data[column];
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
