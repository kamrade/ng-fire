import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post, PostComplex } from './post';
import { Region, RegionComplex } from './entities/region';
import { Status, StatusComplex } from './entities/status';
import { Responsibility, ResponsibilityComplex } from './entities/resp';

@Injectable({
  providedIn: 'root'
})
export class FiredataService {

  private postsCollection: AngularFirestoreCollection<Post>;
  private regionsCollection: AngularFirestoreCollection<Region>;
  private respCollection: AngularFirestoreCollection<Responsibility>;
  private statusesCollection: AngularFirestoreCollection<Status>;
  public posts: Observable<PostComplex[]>;
  public regions: Observable<RegionComplex[]>;
  public resp: Observable<ResponsibilityComplex[]>;
  public statuses: Observable<StatusComplex[]>;


  constructor( private afs: AngularFirestore ) {
    this.postsCollection = this.afs.collection('posts', ref => ref.orderBy('updatedAt', 'desc'));
    this.respCollection = this.afs.collection('ent_responsibility', ref => ref);
    this.statusesCollection = this.afs.collection('ent_statuses', ref => ref);
    this.regionsCollection = this.afs.collection('ent_region', ref => ref);

    this.posts = this.getItemsWithIDs$(this.postsCollection);
    this.regions = this.getItemsWithIDs$(this.regionsCollection);
    this.resp = this.getItemsWithIDs$(this.respCollection);
    this.statuses = this.getItemsWithIDs$(this.statusesCollection);
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

  public getStatus(id: string) {
    const docRef = this.statusesCollection.doc(id);
    docRef.get()
      .subscribe(st => console.log(st.data().title));
  }

  public getRegion(id: string) {
    const docRef = this.regionsCollection.doc(id);
    docRef.get()
      .subscribe(reg => console.log(reg.data().title));
  }

  private getItems$<T>(ref: AngularFirestoreCollection<DocumentData>, queryFn?): Observable<any> {
    return ref.valueChanges();
  }

  private create$<T>(itemData: any, ref: AngularFirestoreCollection<DocumentData>): Promise<any> {
    return ref.add(itemData)
      .then(() => { console.log(':: item created') })
      .catch(err => { console.log(':: item remove error', err) });
  }

  private delete$<T>(itemId: string, ref: AngularFirestoreCollection<DocumentData>): Promise<any> {
    return ref.doc(itemId).delete()
      .then(() => console.log(':: item removed'))
      .catch(err => console.log(':: item remove error', err));
  }

  private update$<T>(itemId: string, ref: AngularFirestoreCollection<DocumentData>, data: any): Promise<any> {
    return ref.doc(itemId).update(data)
      .then(() => console.log(':: item updated'))
      .catch(err => console.log(':: item update error', err));
  }

  // POSTS

  public postDelete$<T>(itemId:string): Promise<any> {
    return this.delete$(itemId, this.postsCollection);
  }

  public postUpdate$<T>(itemId:string, data: any): Promise<any> {
    return this.update$(itemId, this.postsCollection, data);
  }

  public postCreate$<T>(itemData:Post): Promise<any> {
    return this.create$(itemData, this.postsCollection);
  }

  // STATUSES

  public statusDelete$<T>(itemId:string): Promise<any> {
    return this.delete$(itemId, this.statusesCollection);
  }

  public statusUpdate$<T>(itemId:string, data: any): Promise<any> {
    return this.update$(itemId, this.statusesCollection, data);
  }

  public statusCreate$<T>(itemData:Post): Promise<any> {
    return this.create$(itemData, this.statusesCollection);
  }

}
