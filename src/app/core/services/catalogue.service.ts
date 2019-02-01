import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentData } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { CatalogueItem } from 'src/app/core/models/catalogue.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  private catalogueItemsCollection: AngularFirestoreCollection<CatalogueItem>;
  public catalogueItems: Observable<CatalogueItem>;

  constructor(private afs: AngularFirestore) {
    this.catalogueItemsCollection = this.afs.collection('catalogue', ref => {
      return ref;
    });
  }

  getCatalogueItem() {
    return this.catalogueItemsCollection.snapshotChanges()
    .pipe(
      map(actions => actions.map(a => {
        return {
          data: a.payload.doc.data(),
          id: a.payload.doc.id
        };
      })),
      catchError(err => of(err))
    );
  }

}
