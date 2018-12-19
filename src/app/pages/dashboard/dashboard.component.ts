import { Component, OnInit } from '@angular/core';

import { ModalService } from 'src/app/core/modal.service';
import { FiredataService } from 'src/app/core/firedata.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private modalService: ModalService,
    private firedataService: FiredataService
  ) {

    console.log("dash constructor");
    console.log(this.firedataService.st);

  }

  ngOnInit() {}

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
