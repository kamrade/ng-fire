import { Component, OnInit, Input } from '@angular/core';
import { PostsService } from '../../../core/posts.service';

import { Post, PostWithID } from '../../../core/post';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {

  mode = 'view';

  @Input()
  singlePost: PostWithID;

  constructor(public posts: PostsService) { }

  ngOnInit() {}

  editPost() {
    this.mode = 'edit';
  }

  savePost() {
    console.log(this.singlePost)
    console.log(':: save post');
    this.mode = 'view';
    this.posts.updatePost(this.singlePost.id, {
      title: this.singlePost.title,
      content: this.singlePost.content,
      updatedAt: Date.now()
    });
  }

  removePost() {
    this.posts.removePost(this.singlePost.id);
  }


}
