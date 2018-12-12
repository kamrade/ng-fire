import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../core/posts.service';
import { FiredataService } from '../../core/firedata.service';
import { NgForm } from '@angular/forms';
import { Post } from '../../core/post';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

  userID: string;
  userDisplayName: string;

  constructor(
    private auth: AuthService,
    private postsService: PostsService,
    private firedataService: FiredataService) {}

  ngOnInit() {
    const userObject: any = this.auth.user;
    userObject.subscribe(u => {
      if (u) {
        this.userID = u.uid;
        this.userDisplayName = u.displayName;
      } else {
        console.log(":: not authenticated");
      }
    });

    this.firedataService.resp.subscribe((resp) => {
      console.log(resp);
    })
  }

  submitNewPost(event, f:NgForm) {
    event.preventDefault();
    const formContent: Post = f.value;
    const createdAt = Date.now();
    const updatedAt = Date.now();

    this.postsService.createPost({
      ownerID: this.userID,
      ownerDisplayName: this.userDisplayName,
      createdAt,
      updatedAt,
      ...formContent
    });

    f.reset();
  }
}
