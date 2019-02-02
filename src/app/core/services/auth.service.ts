import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { User } from '../user';

export class EmailPasswordCredentials {
  email: string;
  password: string;
  displayName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User>;

  private usersCollection: AngularFirestoreCollection<any>;
  public  users$: Observable<any[]>;

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

    this.usersCollection = this.afs.collection('users');
    this.users$ = this.getUsers$(this.usersCollection);
  }

  public getUserById(id: string) {
    return this.usersCollection.doc(id).ref.get();
  }

  public getUsers$(ref: AngularFirestoreCollection<any>): Observable<any> {
    return ref.valueChanges();
  }

  emailSignUp(credentials: EmailPasswordCredentials): any {
    return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then((c) => {
        this.updateUserData({
          ...c.user,
          displayName: credentials.displayName
        });
      })
      .catch(error => console.log(':: error', error));
  }

  emailSignIn(credentials: EmailPasswordCredentials): any {
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        console.log(':: logged in');
      })
      .catch((err) => {
        const errCode = err.code;
        const errMessage = err.message;
        if (errCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errMessage);
        }
        console.log(err);
      });
  }

  signOut() {
    firebase.auth().signOut()
      .then(() => {
        console.log(':: signed out');
        this.router.navigate(['/auth']);
      }).catch((error) => {
        console.log(':: sign out failed', error);
      })
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider): any {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user);
      });
  }

  // add user to firestore database
  private updateUserData(user: any): any {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    // try to get User with this ID.
    return userRef.ref.get()
      .then((doc) => {
        if (doc.exists) {
          console.log(':: user exists already');
        } else {
          console.log(':: create new user in database');
          const data: User = {
            uid: user.uid,
            email: user.email,
            roles: {
              admin: false,
              editor: false,
              subscriber: true
            },
            displayName: user.displayName || user.email,
            photoURL: user.photoURL
          };

          return userRef.set(data, { merge: true });
        }
      }).catch((err) => {
        console.log(':: error', err);
      });
  }

  // unused
  canRead(user: User): boolean {
    const allowed = ['admin', 'editor', 'subscriber'];
    return this.checkAuthorization(user, allowed);
  }

  // unused
  canEdit(user: User): boolean {
    const allowed = ['admin', 'editor'];
    return this.checkAuthorization(user, allowed);
  }

  // unused
  canDelete(user: User): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }

  // determines if user has matching
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) {
      return false;
    }
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true;
      }
    }
    return false;
  }

}
