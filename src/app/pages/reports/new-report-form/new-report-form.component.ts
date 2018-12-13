import { Component, OnInit } from '@angular/core';

import { FiredataService } from 'src/app/core/firedata.service';
import { StatusComplex } from 'src/app/core/status';

@Component({
  selector: 'app-new-report-form',
  templateUrl: './new-report-form.component.html',
  styleUrls: ['./new-report-form.component.scss']
})
export class NewReportFormComponent implements OnInit {

  statuses: StatusComplex[];

  constructor(private firedataService: FiredataService) { }

  ngOnInit() {}

  resetForm(f) {
    f.reset();
  }

  confirmForm(e, f) {
    e.preventDefault();

    if (f.value.status) {
      this.firedataService.getStatus(f.value.status);
    }

    if (f.value.region) {
      this.firedataService.getRegion(f.value.region);
    }

    f.reset();
  }

}
