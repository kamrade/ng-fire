import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import {
  IconUser,
  IconEdit,
  IconTrash2,
  IconCheck,

  IconChevronDown,
  IconChevronUp,
  IconChevronRight,
  IconChevronLeft
} from 'angular-feather';

const icons = [
  IconUser,
  IconEdit,
  IconTrash2,
  IconCheck,

  IconChevronDown,
  IconChevronUp,
  IconChevronRight,
  IconChevronLeft
];

@NgModule({
  exports: icons
})
export class IconsModule { }
