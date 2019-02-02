import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-entity',
  templateUrl: './new-entity.component.html',
  styleUrls: ['./new-entity.component.scss']
})
export class NewEntityComponent implements OnInit {

  mode: 'simple' | 'creation' = 'simple';

  @Output() createEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  simpleMode() {
    this.mode = 'simple';
  }

  creationMode() {
    this.mode = 'creation';
  }

  create(f: any) {
    this.createEvent.emit(f);
    f.reset();
    this.simpleMode();
  }

}
