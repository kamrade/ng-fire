import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { ReportsPageComponent } from './containers/reports-page/reports-page.component';
import { NewReportFormComponent } from './components/new-report-form/new-report-form.component';
import { ReportsTableComponent } from './components/reports-table/reports-table.component';

const routes: Routes = [{
  path: '',
  component: ReportsPageComponent,
  pathMatch: 'full'
}];

@NgModule({
  declarations: [
    ReportsPageComponent,
    NewReportFormComponent,
    ReportsTableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
})
export class ReportsModule { }
