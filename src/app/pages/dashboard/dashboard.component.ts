import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { EntityComplex } from 'src/app/core/entities/entity';

import { ModalService } from 'src/app/core/modal.service';
import { FiredataService } from 'src/app/core/firedata.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  statuses$: Observable<EntityComplex[]>;

  constructor(
    private modalService: ModalService,
    private firedataService: FiredataService
  ) {}

  ngOnInit() {
    this.firedataService.getEntity('status')
      .subscribe(st => console.log("statuses:", st));
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
