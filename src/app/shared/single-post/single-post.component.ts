import { Component, OnInit, Input } from '@angular/core';

import { FiredataService } from 'src/app/core/services';
import { Post, PostComplex } from 'src/app/core/models';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {

  mode = 'view';

  @Input()
  singlePost: PostComplex;

  constructor(public firedataService: FiredataService) { }

  ngOnInit() {}

  editPost() {
    this.mode = 'edit';
  }

  savePost() {
    console.log(':: saving post...');
    this.mode = 'view';

    this.firedataService.postUpdate$(this.singlePost.id, {
      title: this.singlePost.data.title,
      content: this.singlePost.data.content,
      updatedAt: Date.now()
    });
  }

  deletePost() {
    this.firedataService.postDelete$(this.singlePost.id);
  }


}
