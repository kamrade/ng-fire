import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { StatusService } from '../../../core/status.service';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.scss']
})
export class EntitiesComponent implements OnInit {

  currentRoute = '';

  constructor(private route: ActivatedRoute, private router: Router, private s: StatusService) {

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
    const statusID = data.value.title.toLowerCase().split(' ').join('_');

    this.s.createStatus({
      id: statusID,
      ...data.value
    });
  }

  removeEntity(id) {
    console.log(id);
    console.log(":: removing entity");
    this.s.removeStatus(id);
  }

  updateEntity(entity) {
    this.s.updateStatus(entity);
  }

}
