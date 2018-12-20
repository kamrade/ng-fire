import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap, switchMap } from 'rxjs/operators';

import { FiredataService } from 'src/app/core/firedata.service';
import { ClientsService } from 'src/app/core/clients.service';
import { AuthService } from 'src/app/core/auth.service';

import { EntityComplex } from 'src/app/models/entity';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.scss']
})
export class EntitiesComponent implements OnInit {

  clientFormShow = false;
  currentRoute = '';
  data: Observable<EntityComplex[]>;
  destroy$ = new Subject();

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private firedataService: FiredataService) {}

  ngOnInit() {
    this.route.url
      .pipe(
        takeUntil(this.destroy$),
        tap(route => this.currentRoute = route[0].path)
      ).subscribe((value) => this.data = this.getEntities(this.currentRoute));
  }

  getEntities(value): Observable<EntityComplex[]> {
    switch(value) {
      case 'status':
        return this.firedataService.getEntity('status');
      case 'region':
        return this.firedataService.getEntity('region');
      case 'direction':
        return this.firedataService.getEntity('direction');
      case 'responsibility':
        return this.firedataService.getEntity('responsibility');
      case 'facility':
        return this.firedataService.getEntity('facility');
      case 'equipment':
        return this.firedataService.getEntity('equipment');
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
