import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { FiredataService } from 'src/app/core/firedata.service';
import { ClientsService } from 'src/app/core/clients.service';

import { EntityComplex } from 'src/app/core/entities/entity';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.scss']
})
export class EntitiesComponent implements OnInit {

  clientFormShow = false;
  currentRoute = '';
  data$: Observable<EntityComplex[]>;

  constructor(
    private route: ActivatedRoute,
    private firedataService: FiredataService) {
      this.route.url.subscribe(value => {
        this.currentRoute = value[0].path;
        this.data$ = this.getEntities(this.currentRoute);
      });
  }

  ngOnInit() {
    // this.clientsService.clients$.subscribe(client => console.log(client));
  }

  getEntities(value): Observable<EntityComplex[]> {
    switch(value) {
      case 'status':
        return this.firedataService.statuses;
      case 'region':
        return this.firedataService.regions;
      case 'direction':
        return this.firedataService.directions;
      case 'responsibility':
        return this.firedataService.resp;
      case 'facility':
        return this.firedataService.facilities;
      case 'equipment':
        return this.firedataService.equipments;
      default:
        return null;
    }
  }

  createEntity(data) {
    console.log(`:: creating ${this.currentRoute}...`)
    this.firedataService.create$({
      ...data.value
    }, this.currentRoute);
  }

  deleteEntity(id) {
    console.log(`:: removing ${this.currentRoute}...`);
    this.firedataService.delete$(id, this.currentRoute);
  }

  updateEntity(entity) {
    console.log(`:: updating ${this.currentRoute}...`);
    this.firedataService.update$(entity.id, this.currentRoute, entity.data);
  }

  showClientForm() {
    this.clientFormShow = true;
  }

  hideClientForm() {
    this.clientFormShow = false;
  }

}
