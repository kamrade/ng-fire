import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { IconUser, IconEdit2, IconTrash2 } from 'angular-feather';

const icons = [
  IconUser, IconEdit2, IconTrash2
];

@NgModule({
  exports: icons
})
export class IconsModule { }
