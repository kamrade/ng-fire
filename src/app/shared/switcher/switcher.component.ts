import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.scss']
})
export class SwitcherComponent implements OnInit {

  @Input() initialCheck: boolean;
  @Input() disabled = false;

  @Output() check = new EventEmitter<any>();

  private isChecked: boolean;

  constructor() { }

  ngOnInit() {
    this.isChecked = this.initialCheck || false;
  }

  onChange() {
    if (!this.disabled) {
      this.check.emit(this.isChecked);
    }
  }

}
