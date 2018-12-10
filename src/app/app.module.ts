import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from './core/core.module';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { AuthComponent } from './pages/auth/auth.component';
import { PublicComponent } from './pages/public/public.component';
import { ModalComponent } from './core/modal.directive';


@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    DashboardComponent,
    SettingsComponent,
    AuthComponent,
    PublicComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    CoreModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
