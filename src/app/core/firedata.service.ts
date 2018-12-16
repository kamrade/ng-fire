import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Entity, EntityComplex } from './entities/entity';
import { Post, PostComplex } from './post';

@Injectable({
  providedIn: 'root'
})
export class FiredataService {

  private postsCollection: AngularFirestoreCollection<Post>;
  public posts: Observable<PostComplex[]>;

  private regionsCollection: AngularFirestoreCollection<Entity>;
  private respCollection: AngularFirestoreCollection<Entity>;
  private statusesCollection: AngularFirestoreCollection<Entity>;
  private directionsCollection: AngularFirestoreCollection<Entity>;
  private facilitiesCollection: AngularFirestoreCollection<Entity>;
  private equipmentsCollection: AngularFirestoreCollection<Entity>;

  public regions: Observable<EntityComplex[]>;
  public resp: Observable<EntityComplex[]>;
  public statuses: Observable<EntityComplex[]>;
  public directions: Observable<EntityComplex[]>;
  public facilities: Observable<EntityComplex[]>;
  public equipments: Observable<EntityComplex[]>;

  constructor( private afs: AngularFirestore ) {
    this.postsCollection = this.afs.collection('posts', ref => ref.orderBy('updatedAt', 'desc'));
    this.statusesCollection = this.afs.collection('ent_statuses', ref => ref);
    this.regionsCollection = this.afs.collection('ent_region', ref => ref);
    this.directionsCollection = this.afs.collection('ent_direction', ref => ref);
    this.respCollection = this.afs.collection('ent_responsibility', ref => ref);
    this.facilitiesCollection = this.afs.collection('ent_facility', ref => ref);
    this.equipmentsCollection = this.afs.collection('ent_equipment', ref => ref);

    this.posts = this.getItemsWithIDs$(this.postsCollection);
    this.statuses = this.getItemsWithIDs$(this.statusesCollection);
    this.regions = this.getItemsWithIDs$(this.regionsCollection);
    this.directions = this.getItemsWithIDs$(this.directionsCollection);
    this.resp = this.getItemsWithIDs$(this.respCollection);
    this.facilities = this.getItemsWithIDs$(this.facilitiesCollection);
    this.equipments = this.getItemsWithIDs$(this.equipmentsCollection);
  }

  // CRUD
  public getItemsWithIDs$<T>(ref: AngularFirestoreCollection<T>): Observable<any> {
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

  // пока не используется. ф-цию выполняет getItemsWithID$
  public getItems$(ref: AngularFirestoreCollection<DocumentData>): Observable<any> {
    return ref.valueChanges();
  }

  public getEntityById(entityType: string, entityId: string):Observable<Entity> {
    let ref: AngularFirestoreCollection;
    switch(entityType) {
      case 'status':
        ref = this.statusesCollection;
        break;
      case 'region':
        ref = this.regionsCollection
        break;
      case 'direction':
        ref = this.directionsCollection;
        break;
      case 'responsibility':
        ref = this.respCollection;
        break;
      case 'facility':
        ref = this.facilitiesCollection;
        break;
      case 'equipment':
        ref = this.equipmentsCollection;
        break;
    }

    return ref.doc(entityId).valueChanges() as Observable<Entity>;
  }

  // сейчас тестово используются для создания отчета.
  public getStatus(id: string) {
    const docRef = this.statusesCollection.doc(id);
    return docRef.get();
      // .subscribe(st => console.log(st.data().title));
  }

  // сейчас тестово используются для создания отчета.
  public getRegion(id: string) {
    const docRef = this.regionsCollection.doc(id);
    docRef.get()
      .subscribe(reg => console.log(reg.data().title));
  }

  // COMMON CRUD

  // HELPER
  private setEntityCollection(entityType: string): AngularFirestoreCollection<DocumentData> {
    switch(entityType) {
      case 'status':
        return this.statusesCollection;
      case 'region':
        return  this.regionsCollection;
      case 'direction':
        return this.directionsCollection;
      case 'responsibility':
        return this.respCollection;
      case 'facility':
        return this.facilitiesCollection;
      case 'equipment':
        return this.equipmentsCollection;
      default:
        return null;
    }
  }

  // private actionHandler(toHandle: Promise<any>): Promise<any> {
  //   return toHandle
  //     .then(() => { console.log(':: item created') })
  //     .catch(err => { console.log(':: item remove error', err) });
  // }

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
