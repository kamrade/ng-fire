import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { IconsModule } from 'src/app/icons/icons.module';

import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { MyCounterComponent } from './my-counter/my-counter.component';

const routes: Routes = [{
  path: '',
  component: DashboardPageComponent,
  pathMatch: 'full'
}];

@NgModule({
  declarations: [
    DashboardPageComponent,
    MyCounterComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    IconsModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
