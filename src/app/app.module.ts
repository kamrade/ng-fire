import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { AuthComponent } from './pages/auth/auth.component';
import { PublicComponent } from './pages/public/public.component';
import { ModalComponent } from './core/modal.directive';
import { SigninPageComponent } from './pages/auth/signin-page/signin-page.component';
import { SignupPageComponent } from './pages/auth/signup-page/signup-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

import { IconsModule } from './icons/icons.module';
import { SinglePostComponent } from './pages/public/single-post/single-post.component';
import { EntitiesComponent } from './pages/settings/entities/entities.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { NewReportFormComponent } from './pages/reports/new-report-form/new-report-form.component';
import { ClientFormComponent } from './pages/settings/entities/client-form/client-form.component';


@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    DashboardComponent,
    SettingsComponent,
    AuthComponent,
    PublicComponent,
    ModalComponent,
    SigninPageComponent,
    SignupPageComponent,
    NotFoundComponent,
    SinglePostComponent,
    EntitiesComponent,
    ReportsComponent,
    NewReportFormComponent,
    ClientFormComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    CoreModule,
    AppRoutingModule,
    SharedModule,
    IconsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
