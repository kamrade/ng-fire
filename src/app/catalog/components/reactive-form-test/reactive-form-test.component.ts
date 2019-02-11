import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ModalService } from 'src/app/core/modal.service';

@Component({
  selector: 'app-reactive-form-test',
  templateUrl: './reactive-form-test.component.html',
  styleUrls: ['./reactive-form-test.component.scss']
})
export class ReactiveFormTestComponent implements OnInit {

  myForm: FormGroup;

  constructor(private fb: FormBuilder, private modalService: ModalService) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      email: '',
      phones: this.fb.array([])
    });
    // this.myForm.valueChanges.subscribe(console.log);
  }

  get phoneForms() {
    return this.myForm.get('phones') as FormArray;
  }

  addPhone() {
    const phone = this.fb.group({
      area: [],
      prefix: [],
      line: []
    });

    this.phoneForms.push(phone);
  }

  deletePhone(i: number) {
    this.phoneForms.removeAt(i);
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}

/*

  let states = {
    Valid: false,
    Invalid: true,
    Dirty: false,
    Pristine: true,
    Touched: false,
    Untouching: true,
    Pending: false
  }

*/
