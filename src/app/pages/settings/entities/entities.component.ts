import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FiredataService } from 'src/app/core/firedata.service';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.scss']
})
export class EntitiesComponent implements OnInit {

  currentRoute = '';

  constructor(
    private route: ActivatedRoute,
    private firedataService: FiredataService) {

    this.route.url.subscribe(value => {
      this.currentRoute = value[0].path;
    });
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
