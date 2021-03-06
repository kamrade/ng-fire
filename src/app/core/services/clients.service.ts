import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentSnapshot } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { Client, ClientComplex } from 'src/app/core/models';

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

  public getClientById(id: string): Observable<any> {
    // return from(this.clientsCollection.doc(id).ref.get());
    return this.clientsCollection.doc(id).valueChanges();

  }

  public async create$(clientData: Client): Promise<any> {
    return this.clientsCollection.add(clientData)
      .then(() => { console.log(':: client created'); })
      .catch(err => { console.log(':: error create client', err); });
  }

  public getClientsWithIDs$<T>(ref: AngularFirestoreCollection<T>): Observable<any> {
    return ref.snapshotChanges()
      .pipe( map(actions => {
        return actions.map(a => {
          return {
            data: a.payload.doc.data(),
            id: a.payload.doc.id
          };
        });
      }));
  }
}
