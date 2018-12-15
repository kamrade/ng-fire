import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Report, ReportComplex } from './report';

@Injectable({
  providedIn: 'root'
})

export class ReportsService {

  private reportsCollection: AngularFirestoreCollection<Report>;
  // public reports$: Observable<ReportComplex[]>;

  constructor(private afs: AngularFirestore) {
    this.reportsCollection = this.afs.collection('reports', ref => ref.orderBy('updatedAt', 'desc'));
    // this.reports$ = this.getReportsWithIDs$();
  }

  // CREATE REPORT
  public async create$(reportData: Report): Promise<any> {
    return this.reportsCollection.add(reportData)
      .then(() => { console.log(':: report created') })
      .catch(err => { console.log(':: error create report', err) });
  }

  // GET REPORTS WHICH ARE BEEN CREATED BY CURRENT USER (FOR EDITOR PERMISSIONS)
  public getReportsForCurrentUser$(userId: string): Observable<ReportComplex[]> {
    return this.afs
      .collection('reports', ref => ref.where('createdBy', '==', userId))
      .snapshotChanges()
      .pipe( map(actions => {
        return actions.map(a => {
          return {
            data: a.payload.doc.data(),
            id: a.payload.doc.id
          }
        })
      })) as Observable<ReportComplex[]>;
  }

  // GET ALL REPORTS WITH IDS (ONLY FOR ADMIN PERMISSION)
  public getReportsWithIDs$(): Observable<ReportComplex[]> {
    return this.afs
      .collection('reports', ref => ref)
      .snapshotChanges()
      .pipe( map(actions => {
        return actions.map(a => {
          return {
            data: a.payload.doc.data(),
            id: a.payload.doc.id
          }
        });
      })) as Observable<ReportComplex[]>;
  }
}
