import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

// REDUX THINGS
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { counterReducer } from './reducers/counter.reducer';

// MODULES
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

// MODULE COMPONENTS
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
import { ReportsComponent } from './pages/reports/reports.component';
import { EntitiesComponent } from 'src/app/pages/settings/entities/entities.component';

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
    ReportsComponent,
    EntitiesComponent
  ],
  imports: [
    StoreModule.forRoot({ count: counterReducer }),
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    CoreModule,
    AppRoutingModule,
    SharedModule,
    IconsModule,
    StoreModule.forRoot({ count: counterReducer }),
    StoreDevtoolsModule.instrument({
      name: 'NG Fire App Devtools',
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
