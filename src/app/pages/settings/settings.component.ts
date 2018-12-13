import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public isAdmin = false;

  constructor(private authService: AuthService) {
    this.authService.user
      .subscribe( user => this.isAdmin = user && user.roles.admin );
  }

  ngOnInit() {
  }

}
