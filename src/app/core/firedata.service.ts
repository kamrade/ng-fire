import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Note, NoteComplex } from './note';
import { Post, PostComplex } from './post';

@Injectable({
  providedIn: 'root'
})
export class FiredataService {

  private notesCollection: AngularFirestoreCollection<Note>;
  private postsCollection: AngularFirestoreCollection<Note>;
  private respCollection: AngularFirestoreCollection<Note>;
  public notes: Observable<NoteComplex[]>;
  public posts: Observable<NoteComplex[]>;
  public resp: Observable<NoteComplex[]>;

  constructor( private afs: AngularFirestore ) {
    this.notesCollection = this.afs.collection('notes', ref => ref.orderBy('updatedAt', 'desc'));
    this.postsCollection = this.afs.collection('posts', ref => ref.orderBy('updatedAt', 'desc'));
    this.respCollection = this.afs.collection('ent_responsibility', ref => ref);
    this.notes = this.getItemsWithIDs$(this.notesCollection);
    this.posts = this.getItemsWithIDs$(this.postsCollection);
    this.resp = this.getItemsWithIDs$(this.respCollection);
  }

  // CRUD

  private getItemsWithIDs$<T>(ref: AngularFirestoreCollection<T>, queryFn?): Observable<any> {
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

  private getItems$<T>(ref: AngularFirestoreCollection<DocumentData>, queryFn?): Observable<any> {
    return ref.valueChanges();
  }

  public create$<T>(item: any, ref: AngularFirestoreCollection<DocumentData>): Promise<any> {
    return ref.add(item)
      .then(() => { console.log(':: item created') })
      .catch(err => { console.log(':: item remove error', err) });
  }

  public delete$<T>(itemId: string, ref: AngularFirestoreCollection<DocumentData>): Promise<any> {
    return ref.doc(itemId).delete()
      .then(() => console.log(':: item removed'))
      .catch(err => console.log(':: item remove error', err));
  }

  public update$<T>(itemId: string, ref: AngularFirestoreCollection<DocumentData>, data: any): Promise<any> {
    return ref.doc(itemId).update(data)
      .then(() => console.log(':: item updated'))
      .catch(err => console.log(':: item update error', err));
  }

}
