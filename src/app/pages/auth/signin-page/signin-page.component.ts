import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.scss']
})
export class SigninPageComponent implements OnInit {

  constructor(public auth: AuthService) {}

  ngOnInit() {
  }

  signIn(event, formData:NgForm) {
    event.preventDefault();
    this.auth.emailSignIn(formData.value);
  }

}
