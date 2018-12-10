import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/auth.guard';

import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { AuthComponent } from './pages/auth/auth.component';
import { PublicComponent } from './pages/public/public.component';

const routes: Routes = [{
  path: '',
  redirectTo: '/profile',
  pathMatch: 'full'
}, {
  path: 'dashboard',
  canActivate: [AuthGuard],
  component: DashboardComponent
}, {
  path: 'setting',
  canActivate: [AuthGuard],
  component: SettingsComponent
}, {
  path: 'profile',
  canActivate: [AuthGuard],
  component: UserProfileComponent
}, {
  path: 'login',
  component: AuthComponent
}, {
  path: 'public',
  component: PublicComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
