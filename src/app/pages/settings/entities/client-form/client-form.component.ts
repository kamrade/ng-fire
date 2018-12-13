import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ClientsService } from 'src/app/core/clients.service';
import { AuthService } from 'src/app/core/auth.service';

import { Client } from 'src/app/core/client';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {

  userID: string;
  userDisplayName: string;

  @Output()
  hideForm = new EventEmitter<any>();

  constructor(private clientsService: ClientsService, private auth: AuthService) {
    const userObject: any = this.auth.user;
    userObject.subscribe(u => {
      if (u) {
        this.userID = u.uid;
        this.userDisplayName = u.displayName;
      } else {
        console.log(":: not authenticated");
      }
    });
  }

  ngOnInit() {
  }

  create(f) {
    console.log(':: creating form');
    const data = f.value;
    
    let clientObject: Client = {
      address: {
        zipCode: data.zipCode,
        country: data.country,
        district: data.district,
        city: data.city,
        street: data.street,
        building: data.building,
        office: data.office
      },
      contacts: [{
        contact: data.contact,
        contactPerson: data.contactPerson
      }],
      description: data.description,
      title: data.title,
      notes: [{
        title: data.noteTitle,
        content: data.noteContent,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        creator: this.userID,
        creatorDisplayName: this.userDisplayName
      }],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      createdBy: this.userID
    };

    this.clientsService.create$(clientObject);
    this.hideForm.emit();
  }

  cancel() {
    this.hideForm.emit();
  }

}
