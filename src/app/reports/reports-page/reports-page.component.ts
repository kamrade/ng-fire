import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports-page',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.scss']
})
export class ReportsPageComponent implements OnInit {

  isShowReportForm = false;

  constructor() { }

  ngOnInit() {
  }

  showReportForm() {
    this.isShowReportForm = true;
  }

  hideReportForm() {
    this.isShowReportForm = false;
  }

}
