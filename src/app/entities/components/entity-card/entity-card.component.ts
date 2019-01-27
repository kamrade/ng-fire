import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-entity-card',
  templateUrl: './entity-card.component.html',
  styleUrls: ['./entity-card.component.scss']
})
export class EntityCardComponent implements OnInit {

  mode: 'view' | 'edit' = 'view';

  @Output() onDelete = new EventEmitter<any>();
  @Output() onChange = new EventEmitter<any>();

  @Input()
  data: any;

  formData: any;
  savedData: any;

  constructor() { }

  ngOnInit() {
    this.formData = JSON.parse(JSON.stringify(this.data));
    this.savedData = JSON.parse(JSON.stringify(this.data));
  }

  viewMode() {
    this.mode = 'view';
  }

  editMode() {
    this.savedData = JSON.parse(JSON.stringify(this.formData));
    this.mode = 'edit';
  }

  cancel() {
    this.formData = JSON.parse(JSON.stringify(this.savedData));
    this.viewMode();
  }

  delete(id) {
    this.onDelete.emit(id);
  }

  update() {
    this.onChange.emit(this.formData);
    this.viewMode();
  }

}
