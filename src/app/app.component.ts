import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  signed = false;

  constructor( public auth: AuthService ) {}

  ngOnInit() {
    const userObject: any = this.auth.user;
    userObject.subscribe((u: any) => {
      if (u) {
        this.signed = true;
      } else {
        this.signed = false;
      }
    });
  }

}
