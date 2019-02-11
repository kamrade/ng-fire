import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ModalService } from 'src/app/core/modal.service';

@Component({
  selector: 'app-reactive-forms-validate',
  templateUrl: './reactive-forms-validate.component.html',
  styleUrls: ['./reactive-forms-validate.component.scss']
})
export class ReactiveFormsValidateComponent implements OnInit {

  myForm: FormGroup;

  constructor(private fb: FormBuilder, private modalService: ModalService) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')
      ]],
      age: [null, [
        Validators.required,
        Validators.minLength(2),
        Validators.min(18),
        Validators.min(65),
      ]],
      agree: [false, [
        Validators.requiredTrue
      ]]
    });
  }

  get email() {
    return this.myForm.get('email');
  }

  get password() {
    return this.myForm.get('password');
  }

  get age() {
    return this.myForm.get('age');
  }

  get agree() {
    return this.myForm.get('agree');
  }



  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
