import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { IconUser, IconEdit, IconTrash2, IconCheck } from 'angular-feather';

const icons = [
  IconUser,
  IconEdit,
  IconTrash2,
  IconCheck
];

@NgModule({
  exports: icons
})
export class IconsModule { }
