import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
}

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
            displayName: user.displayName,
            photoURL: user.photoURL
          }

          return userRef.set(data);
        }
      }).catch((err) => {
        console.log(':: error', err);
      });
  }

}
