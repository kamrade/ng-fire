import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LazyMainComponent } from './lazy-main/lazy-main.component';

const routes: Routes = [{
  path: '',
  component: LazyMainComponent,
  pathMatch: 'full'
}];

@NgModule({
  declarations: [
    LazyMainComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class LazyModule { }
