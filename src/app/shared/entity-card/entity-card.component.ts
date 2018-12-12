import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-entity-card',
  templateUrl: './entity-card.component.html',
  styleUrls: ['./entity-card.component.scss']
})
export class EntityCardComponent implements OnInit {

  mode: 'view' | 'edit' = 'view';

  @Output() onRemove = new EventEmitter<any>();
  @Output() onChange = new EventEmitter<any>();

  @Input()
  data: any;

  constructor() { }

  ngOnInit() {}

  viewMode() {
    this.mode = 'view';
  }

  editMode() {
    this.mode = 'edit';
  }

  remove(id) {
    this.onRemove.emit(id);
  }

  update() {
    this.onChange.emit(this.data);
    this.viewMode();
  }

}
