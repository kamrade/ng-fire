import { Component, OnInit } from '@angular/core';

import { ModalService } from 'src/app/core/modal.service';
import { FiredataService } from 'src/app/core/firedata.service';
import { StatusComplex } from 'src/app/core/status';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private bodyText: string;

  statuses: StatusComplex[];

  constructor(
    private modalService: ModalService,
    private firedataService: FiredataService
  ) { }

  ngOnInit() {
    this.bodyText = 'This text can be updated in modal 1';
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  create(e, f) {
    e.preventDefault();

    if (f.value.status) {
      this.firedataService.getStatus(f.value.status);
    }

    if (f.value.region) {
      this.firedataService.getRegion(f.value.region);
    }

    this.closeModal('modal-dialog-new-report');
    f.reset();
  }

}
