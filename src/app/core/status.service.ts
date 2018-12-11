import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Status } from './status';

@Injectable({
  providedIn: 'root'
})

export class StatusService {

  public statusesCollection: AngularFirestoreCollection<Status>;
  public statuses: Observable<Status[]>;
  public statusesWithId: Observable<any[]>;

  constructor(private afs: AngularFirestore) {
    this.statusesCollection = this.afs.collection('ent_statuses'); // reference
    this.getStatuses();
    this.getStatusesWithId();
  }

  getStatuses() {
    this.statuses = this.statusesCollection.valueChanges();    // observable of statuses data
  }

  getStatusesWithId() {
    this.statusesWithId = this.statusesCollection.snapshotChanges()
      .pipe(map(actions => {
        return actions.map(a => {
          let contentData = a.payload.doc.data();
          let idsData = a.payload.doc.id;
          let resolveData = {
            ...contentData,
            id: idsData
          };
          return resolveData;
        });
      }));
  }

}
