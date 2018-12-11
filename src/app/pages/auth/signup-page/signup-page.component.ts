import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  constructor(public auth: AuthService) {}

  ngOnInit() {
  }

  signUp(event, formData:NgForm) {
    event.preventDefault();
    this.auth.emailSignUp(formData.value);
  }

}
