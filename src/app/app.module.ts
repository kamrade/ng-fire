import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

// REDUX THINGS
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// MODULES
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { EntitiesModule } from './entities/entities.module';
import { IconsModule } from './icons/icons.module';

// MODULE COMPONENTS
import { AppComponent } from './app.component';
import { AuthComponent } from './pages/auth/auth.component';
import { PublicComponent } from './pages/public/public.component';

import { SigninPageComponent } from './pages/auth/signin-page/signin-page.component';
import { SignupPageComponent } from './pages/auth/signup-page/signup-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    PublicComponent,
    SigninPageComponent,
    SignupPageComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    CoreModule,
    AppRoutingModule,
    SharedModule,
    EntitiesModule,
    IconsModule,
    StoreModule.forRoot({ }),
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
