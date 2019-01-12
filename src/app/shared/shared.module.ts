import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IconsModule } from '../icons/icons.module';

// LIB
import { SwitcherComponent } from './switcher/switcher.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';

// REPORTS
import { NewReportFormComponent } from './new-report-form/new-report-form.component';

// POSTS
import { SinglePostComponent } from './single-post/single-post.component';
import { ReportsTableComponent } from './reports-table/reports-table.component';
import { MyCounterComponent } from './my-counter/my-counter.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    IconsModule,
    FormsModule
  ],
  declarations: [
    MainNavigationComponent,
    SwitcherComponent,
    NewReportFormComponent,
    SinglePostComponent,
    ReportsTableComponent,
    MyCounterComponent
  ],
  exports: [
    MainNavigationComponent,
    FormsModule,
    SwitcherComponent,
    NewReportFormComponent,
    SinglePostComponent,
    ReportsTableComponent,
    MyCounterComponent
  ]
})
export class SharedModule { }
