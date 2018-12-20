import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentData } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Entity, EntityComplex } from 'src/app/models/entity';
import { Post, PostComplex } from './post';

@Injectable({
  providedIn: 'root'
})
export class FiredataService {

  private postsCollection: AngularFirestoreCollection<Post>;
  public  posts: Observable<PostComplex[]>;

  private staCol: AngularFirestoreCollection<Entity>;
  private regCol: AngularFirestoreCollection<Entity>;
  private dirCol: AngularFirestoreCollection<Entity>;
  private resCol: AngularFirestoreCollection<Entity>;
  private facCol: AngularFirestoreCollection<Entity>;
  private equCol: AngularFirestoreCollection<Entity>;

  constructor( private afs: AngularFirestore ) {

    this.postsCollection = this.afs.collection('posts', ref => ref.orderBy('updatedAt', 'desc'));
    this.posts = this.getItemsWithIDs$(this.postsCollection);

    this.staCol = this.afs.collection('ent_statuses', ref => ref);
    this.regCol = this.afs.collection('ent_region', ref => ref);
    this.dirCol = this.afs.collection('ent_direction', ref => ref);
    this.resCol = this.afs.collection('ent_responsibility', ref => ref);
    this.facCol = this.afs.collection('ent_facility', ref => ref);
    this.equCol = this.afs.collection('ent_equipment', ref => ref);
  }

  // NEW
  public getEntity(entityType: string) {
    let ref: AngularFirestoreCollection<Entity>;
    switch(entityType) {
      case 'status':
        ref = this.staCol;
        break;
      case 'region':
        ref = this.regCol;
        break;
      case 'direction':
        ref = this.dirCol;
        break;
      case 'responsibility':
        ref = this.resCol;
        break;
      case 'facility':
        ref = this.facCol;
        break;
      case 'equipment':
        ref = this.equCol;
        break;
      default:
        ref = null;
    }

    return ref.snapshotChanges().pipe(
      map(actions => actions.map(a => ({
        data: a.payload.doc.data(),
        id: a.payload.doc.id
      }))),
      catchError(err => of(err))
    );

  }

  // CRUD
  public getItemsWithIDs$(ref: AngularFirestoreCollection): Observable<any[]> {
    return ref.snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            return {
              data: a.payload.doc.data(),
              id: a.payload.doc.id
            };
          });
        }));
  }

  // HELPER
  private setEntityCollection(entityType: string): AngularFirestoreCollection<DocumentData> {
    switch(entityType) {
      case 'status':
        return this.staCol;
      case 'region':
        return this.regCol;
      case 'direction':
        return this.dirCol;
      case 'responsibility':
        return this.resCol;
      case 'facility':
        return this.facCol;
      case 'equipment':
        return this.equCol;
      default:
        return null;
    }
  }

  public async create$(itemData: Entity, entityType: string): Promise<any> {
    const ref = this.setEntityCollection(entityType);
    return ref.add(itemData)
      .then(() => { console.log(':: item created') })
      .catch(err => { console.log(':: item remove error', err) });
  }

  public async delete$(itemId: string, entityType: string): Promise<any> {
    const ref = this.setEntityCollection(entityType);
    return ref.doc(itemId).delete()
      .then(() => console.log(':: item removed'))
      .catch(err => console.log(':: item remove error', err));
  }

  public async update$(itemId: string, entityType: string, data: any): Promise<any> {
    const ref = this.setEntityCollection(entityType);
    return ref.doc(itemId).update(data)
      .then(() => console.log(':: item updated'))
      .catch(err => console.log(':: item update error', err));
  }

  // POSTS
  public async postDelete$(itemId:string): Promise<any> {
    return this.postsCollection.doc(itemId).delete()
      .then(() => console.log(':: post removed'))
      .catch(err => console.log(':: post remove error', err));
  }

  public async postUpdate$(itemId:string, data: any): Promise<any> {
    return this.postsCollection.doc(itemId).update(data)
      .then(() => console.log(':: post updated'))
      .catch(err => console.log(':: post update error', err));
  }

  public async postCreate$(itemData:Post): Promise<any> {
    return this.postsCollection.add(itemData)
      .then(() => { console.log(':: post created') })
      .catch(err => { console.log(':: post remove error', err) });
  }


}
