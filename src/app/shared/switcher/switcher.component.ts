import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.scss']
})
export class SwitcherComponent implements OnInit {

  public isChecked: false;

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    console.log(this.isChecked);
  }

}
