import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User>;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {

    //// Get auth data, then get firestore user document || null
    this.user = this.afAuth.authState
      .pipe(switchMap(user => {
        if (user) {
          // TODO: выяснить что делает вот это
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      }));

  }

  signOut() {
    firebase.auth().signOut()
      .then(() => {
        console.log(':: signed out');
        this.router.navigate(['/login']);
      }).catch((error) => {
        console.log(':: sign out failed', error);
      })
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider)
  }

  private oAuthLogin(provider): any {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user);
      })
  }

  private updateUserData(user): any {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    // let savedUser: Observable<User>;
    // savedUser = userRef.valueChanges();
    // savedUser.subscribe(data => { console.log(data) });

    // try to get User with this ID.
    return userRef.ref.get()
      .then((doc) => {
        // Check this user existings
        // if user exists we don't create anything
        if (doc.exists) {
          console.log(':: user exists already');
        } else {
          // if user sign first time, we create new database document for this user
          console.log(':: create new user in database');
          const data: User = {
            uid: user.uid,
            email: user.email,
            roles: {
              admin: false,
              editor: false,
              subscriber: true
            },
            displayName: user.displayName,
            photoURL: user.photoURL
          }

          return userRef.set(data, { merge: true });
        }
      }).catch((err) => {
        console.log(':: error', err);
      });
  }

  canRead(user: User): boolean {
    const allowed = ['admin', 'editor', 'subscriber'];
    return this.checkAuthorization(user, allowed);
  }

  canEdit(user: User): boolean {
    const allowed = ['admin', 'editor'];
    return this.checkAuthorization(user, allowed);
  }

  canDelete(user: User): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }

  // determines if user has matching
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false;
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true;
      }
    }
    return false;
  }

}
