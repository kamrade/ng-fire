import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AuthService } from './auth.service';
import { FiredataService } from './firedata.service';
import { ModalService } from './modal.service';

@NgModule({
  imports: [
    CommonModule,
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    RouterModule.forRoot([])
  ],
  exports: [],
  providers: [AuthService, ModalService, FiredataService],
  declarations: []
})
export class CoreModule { }
