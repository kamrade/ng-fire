import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services';

@Component({
  selector: 'app-entities-page',
  templateUrl: './entities-page.component.html',
  styleUrls: ['./entities-page.component.scss']
})
export class EntitiesPageComponent {

  public isAdmin = false;

  constructor(private authService: AuthService) {

    this.authService.user
      .subscribe( user => this.isAdmin = user && user.roles.admin );
  }

}
