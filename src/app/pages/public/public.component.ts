import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../core/posts.service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

  constructor(public allPosts: PostsService) { }

  ngOnInit() {}

}
