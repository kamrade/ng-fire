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

  private statusesCollection:   AngularFirestoreCollection<Entity>;
  private regionsCollection:    AngularFirestoreCollection<Entity>;
  private directionsCollection: AngularFirestoreCollection<Entity>;
  private respCollection:       AngularFirestoreCollection<Entity>;
  private facilitiesCollection: AngularFirestoreCollection<Entity>;
  private equipmentsCollection: AngularFirestoreCollection<Entity>;

  public statuses:   Observable<EntityComplex[]>;
  public regions:    Observable<EntityComplex[]>;
  public directions: Observable<EntityComplex[]>;
  public resp:       Observable<EntityComplex[]>;
  public facilities: Observable<EntityComplex[]>;
  public equipments: Observable<EntityComplex[]>;

  constructor( private afs: AngularFirestore ) {

    this.postsCollection      = this.afs.collection('posts', ref => ref.orderBy('updatedAt', 'desc'));
    this.posts                = this.getItemsWithIDs$(this.postsCollection);

    this.statusesCollection   = this.afs.collection('ent_statuses', ref => ref);
    this.regionsCollection    = this.afs.collection('ent_region', ref => ref);
    this.directionsCollection = this.afs.collection('ent_direction', ref => ref);
    this.respCollection       = this.afs.collection('ent_responsibility', ref => ref);
    this.facilitiesCollection = this.afs.collection('ent_facility', ref => ref);
    this.equipmentsCollection = this.afs.collection('ent_equipment', ref => ref);

    this.statuses   = this.getItemsWithIDs$(this.statusesCollection);
    this.regions    = this.getItemsWithIDs$(this.regionsCollection);
    this.directions = this.getItemsWithIDs$(this.directionsCollection);
    this.resp       = this.getItemsWithIDs$(this.respCollection);
    this.facilities = this.getItemsWithIDs$(this.facilitiesCollection);
    this.equipments = this.getItemsWithIDs$(this.equipmentsCollection);

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
        return this.statusesCollection;
      case 'region':
        return this.regionsCollection;
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
