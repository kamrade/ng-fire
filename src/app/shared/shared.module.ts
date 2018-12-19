import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IconsModule } from '../icons/icons.module';

// LIB
import { SwitcherComponent } from './switcher/switcher.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';

// SETTINGS
import { NewEntityComponent } from './new-entity/new-entity.component';
import { EntityCardComponent } from './entity-card/entity-card.component';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ClientFormComponent } from './client-form/client-form.component';

// REPORTS
import { NewReportFormComponent } from './new-report-form/new-report-form.component';

// POSTS
import { SinglePostComponent } from './single-post/single-post.component';
// import { ReportListComponent } from './report-list/report-list.component';
import { ReportsTableComponent } from './reports-table/reports-table.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    IconsModule,
    FormsModule
  ],
  declarations: [
    MainNavigationComponent,
    NewEntityComponent,
    EntityCardComponent,
    SwitcherComponent,
    ClientsListComponent,
    UserDetailsComponent,
    ClientFormComponent,
    NewReportFormComponent,
    SinglePostComponent,
    // ReportListComponent,
    ReportsTableComponent
  ],
  exports: [
    MainNavigationComponent,
    NewEntityComponent,
    EntityCardComponent,
    FormsModule,
    SwitcherComponent,
    ClientsListComponent,
    UserDetailsComponent,
    ClientFormComponent,
    NewReportFormComponent,
    SinglePostComponent,
    // ReportListComponent,
    ReportsTableComponent
  ]
})
export class SharedModule { }
