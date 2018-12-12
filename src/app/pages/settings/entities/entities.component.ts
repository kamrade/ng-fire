import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { FiredataService } from '../../../core/firedata.service';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.scss']
})
export class EntitiesComponent implements OnInit {

  currentRoute = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firedataService: FiredataService) {

    this.route.url.subscribe(value => {
      this.currentRoute = value[0].path;
      // if (this.currentRoute !== 'status' && this.currentRoute !== 'region') {
      //   this.router.navigate(['/profile']);
      // }
    });

    // this.s.statuses.subscribe(i => console.log(i));

    // this.router.events.pipe(filter(value => value instanceof  NavigationEnd)).subscribe(value => {
      // console.log(':: after navigation end', value)
    // });
  }

  ngOnInit() {
  }

  createEntity(data) {
    this.firedataService.statusCreate$({
      ...data.value
    });
  }

  deleteEntity(id) {
    console.log(":: removing entity...");
    this.firedataService.statusDelete$(id);
  }

  updateEntity(entity) {
    this.firedataService.statusUpdate$(entity.id, entity.data);
  }

}
