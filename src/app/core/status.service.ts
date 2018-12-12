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

  createStatus(status: Status) {
    const docRef = this.statusesCollection.doc(status.id);
    docRef.set(status)
      .then((s) => console.log(':: status created', s))
      .catch(err => console.log(':: status create error', err));
  }

  removeStatus(id) {
    this.statusesCollection.doc(id).delete()
      .then(() => {
        console.log(':: entity deleted');
      }).catch((err) => {
        console.log(':: error removing entity', err);
      })
  }

  updateStatus(newStatusData: any) {
    this.statusesCollection.doc(newStatusData.id).update(newStatusData)
      .then(() => console.log(':: status updated'))
      .catch(err => console.log(':: status update error', err));
  }


}
