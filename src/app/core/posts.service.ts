import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post, PostWithID } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  postsCollection: AngularFirestoreCollection<Post>;
  posts: Observable<Post[]>;
  postsWithIds: Observable<PostWithID[]>;

  constructor(private afs: AngularFirestore) {
    this.postsCollection = this.afs.collection('posts', ref => ref.orderBy('createdAt', 'desc')); // reference
    this.getPostsWithIds();
    this.getPosts();
  }

  getPostsWithIds() {
    this.postsWithIds = this.postsCollection.snapshotChanges()
      .pipe(map(actions => {
        return actions.map(a => {
          let contentData = a.payload.doc.data();
          let idsData = a.payload.doc.id;
          let resolveData = {
            ...contentData,
            id: idsData
          };
          return resolveData;
        });
      }));
    // this.postsWithIds.subscribe(item => console.log(item));
  }

  getPosts() {
    this.posts = this.postsCollection.valueChanges();    // observable of posts data
  }

  createPost(post: Post) {
    this.postsCollection.add(post)
      .then(() => console.log(':: post created'))
      .catch(err => console.log(':: remove error', err));
  }

  removePost(postID: string) {
    this.postsCollection.doc(postID).delete()
      .then(() => console.log(':: post removed'))
      .catch(err => console.log(':: post remove error', err));
  }

  updatePost(id: string, newPostData: any) {
    this.postsCollection.doc(id).update(newPostData)
      .then(() => console.log(':: post updated'))
      .catch(err => console.log(':: post update error', err));
  }
}
