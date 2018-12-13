import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Client, ClientComplex } from './client';

@Injectable({
  providedIn: 'root'
})

export class ClientsService {

  private clientsCollection: AngularFirestoreCollection<Client>;
  public clients$: Observable<ClientComplex[]>;

  constructor(private afs: AngularFirestore) {
    this.clientsCollection = this.afs.collection('client', ref => ref.orderBy('updatedAt', 'desc'));
    this.clients$ = this.getClientsWithIDs$(this.clientsCollection);
  }

  public async create$(clientData: Client): Promise<any> {
    return this.clientsCollection.add(clientData)
      .then(() => { console.log(':: client created') })
      .catch(err => { console.log(':: error create client', err) });
  }

  public getClientsWithIDs$<T>(ref: AngularFirestoreCollection<T>): Observable<any> {
    return ref.snapshotChanges()
      .pipe( map(actions => {
        return actions.map(a => {
          return {
            data: a.payload.doc.data(),
            id: a.payload.doc.id
          }
        });
      }));
  }
}
