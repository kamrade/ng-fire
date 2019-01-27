import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { reducers } from './store';

import { SharedModule } from 'src/app/shared/shared.module';
import { IconsModule } from 'src/app/icons/icons.module';

import { DashboardPageComponent } from './containers/dashboard-page/dashboard-page.component';
import { MyCounterComponent } from './components/my-counter/my-counter.component';

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
    RouterModule.forChild(routes),
    StoreModule.forFeature('dashboard_counter', reducers)
  ]
})
export class DashboardModule { }
