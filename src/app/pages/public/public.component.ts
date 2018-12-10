import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../core/posts.service';
import { NgForm } from '@angular/forms';
import { Post } from '../../core/post';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

  constructor(public posts: PostsService) { }

  ngOnInit() {}

  submitNewPost(event, f:NgForm) {
    event.preventDefault();
    console.log(":: create new post");

    const formContent: Post = f.value;
    console.log(formContent);
    this.posts.createPost(formContent);

  }

  editPost(post) {
    console.log(':: edit post', post)
  }

}
