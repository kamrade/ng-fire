import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services';

import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  signed = true;

  constructor(public auth: AuthService,
              private router: Router) {}

  ngOnInit() {
    const userObject: any = this.auth.user;
    userObject.subscribe(u => {
      if (u) {
        this.signed = true;
        this.router.navigate(['/profile']);
      } else {
        this.signed = false;
      }
    });
  }
}
