import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/auth.guard';

import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { AuthComponent } from './pages/auth/auth.component';
import { PublicComponent } from './pages/public/public.component';
import { SigninPageComponent } from './pages/auth/signin-page/signin-page.component';
import { SignupPageComponent } from './pages/auth/signup-page/signup-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

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
  path: 'auth',
  component: AuthComponent,
  children: [{
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  }, {
    path: 'signin',
    component: SigninPageComponent
  }, {
    path: 'signup',
    component: SignupPageComponent
  }]
}, {
  path: 'public',
  component: PublicComponent
}, {
  path: '**',
  component: NotFoundComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
