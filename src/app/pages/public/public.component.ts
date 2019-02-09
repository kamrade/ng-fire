import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Post } from 'src/app/core/models';

import { FiredataService } from 'src/app/core/services';
import { AuthService } from 'src/app/core/services';

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
    private firedataService: FiredataService) {}

  ngOnInit() {
    const userObject: any = this.auth.user;
    userObject.subscribe((u: any) => {
      if (u) {
        this.userID = u.uid;
        this.userDisplayName = u.displayName;
      } else {
        console.log(':: not authenticated');
      }
    });
  }

  submitNewPost(event: any, f: NgForm) {
    event.preventDefault();
    const formContent: Post = f.value;
    const createdAt = Date.now();
    const updatedAt = Date.now();

    this.firedataService.postCreate$({
      ownerID: this.userID,
      ownerDisplayName: this.userDisplayName,
      createdAt,
      updatedAt,
      ...formContent
    });

    f.reset();
  }
}
