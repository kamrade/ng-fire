import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface Post {
  title: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  postsCollection: AngularFirestoreCollection<Post>;
  posts: Observable<Post[]>;
  // allPosts: any;

  constructor(private afs: AngularFirestore) {
    this.getPosts();
  }

  getPosts() {
    this.postsCollection = this.afs.collection('posts'); // reference
    this.posts = this.postsCollection.valueChanges();    // observable of posts data
    // this.allPosts = this.posts.subscribe(post => post);
  }
}
