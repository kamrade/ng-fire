import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AuthService } from './services';
import { FiredataService } from './services';
import { ModalService } from './modal.service';
import { ClientsService } from './services';

@NgModule({
  imports: [
    CommonModule,
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    RouterModule.forChild([]),
    StoreModule.forFeature('core', reducers),
    HttpClientModule,
    EffectsModule.forRoot(effects)
  ],
  exports: [],
  providers: [
    AuthService,
    ModalService,
    FiredataService,
    ClientsService
  ],
  declarations: []
})
export class CoreModule {}
