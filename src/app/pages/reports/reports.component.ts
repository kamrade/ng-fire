import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  isShowReportForm = false;

  constructor() {}

  ngOnInit() {}

  showReportForm() {
    this.isShowReportForm = true;
  }

  hideReportForm() {
    this.isShowReportForm = false;
  }

}
