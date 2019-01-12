import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/auth.guard';

import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthComponent } from './pages/auth/auth.component';
import { PublicComponent } from './pages/public/public.component';
import { SigninPageComponent } from './pages/auth/signin-page/signin-page.component';
import { SignupPageComponent } from './pages/auth/signup-page/signup-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
// import { EntitiesComponent } from './entities/entities/entities.component';
// import { EntitiesPageComponent } from './entities/entities-page/entities-page.component';

const routes: Routes = [{
  path: '',
  component: DashboardComponent,
  canActivate: [AuthGuard],
  pathMatch: 'full'
}, {
  path: 'lazy',
  canActivate: [AuthGuard],
  loadChildren: './lazy/lazy.module#LazyModule'
}, {
  path: 'reports',
  canActivate: [AuthGuard],
  loadChildren: './reports/reports.module#ReportsModule'
}];

// const routes: Routes = [{
//   path: '',
//   redirectTo: '/profile',
//   pathMatch: 'full'
// }, {
//   path: 'dashboard',
//   canActivate: [AuthGuard],
//   component: DashboardComponent
// }, {
//   path: 'setting',
//   canActivate: [AuthGuard],
//   component: EntitiesPageComponent,
//   children: [{
//     path: '',
//     redirectTo: 'status',
//     pathMatch: 'full'
//   }, {
//     path: ':id',
//     component: EntitiesComponent
//   }]
// }, {
//   path: 'profile',
//   canActivate: [AuthGuard],
//   component: UserProfileComponent
// }, {
//   path: 'auth',
//   component: AuthComponent,
//   children: [{
//     path: '',
//     redirectTo: 'signin',
//     pathMatch: 'full'
//   }, {
//     path: 'signin',
//     component: SigninPageComponent
//   }, {
//     path: 'signup',
//     component: SignupPageComponent
//   }]
// }, {
//   path: 'public',
//   component: PublicComponent
// }, {
//   path: 'reports',
//   component: ReportsComponent
// }, {
//   path: 'lazy',
//   pathMatch: 'full',
//   component: LazyMainComponent
// },{
//   path: '**',
//   component: NotFoundComponent
// }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
