import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  profiled = false;

  constructor(public auth: AuthService,
              private router: Router) {}

  ngOnInit() {
    const userObject: any = this.auth.user;
    userObject.subscribe(u => {
      if (u) {
        this.router.navigate(['/profile']);
      } else {
        this.profiled = true;
      }
    });
  }

}
