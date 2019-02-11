import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IconsModule } from '../icons/icons.module';

// LIB
import { SwitcherComponent } from './switcher/switcher.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

// POSTS
import { SinglePostComponent } from './single-post/single-post.component';

import { ModalComponent } from 'src/app/core/modal.directive';
import { FormFieldComponent } from './form-field/form-field.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    IconsModule,
    FormsModule
  ],
  declarations: [
    MainNavigationComponent,
    SwitcherComponent,
    SinglePostComponent,
    ModalComponent,
    NotFoundPageComponent,
    FormFieldComponent
  ],
  exports: [
    MainNavigationComponent,
    FormsModule,
    SwitcherComponent,
    SinglePostComponent,
    ModalComponent,
    NotFoundPageComponent
  ]
})
export class SharedModule { }
