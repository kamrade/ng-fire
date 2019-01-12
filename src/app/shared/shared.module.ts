import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IconsModule } from '../icons/icons.module';

// LIB
import { SwitcherComponent } from './switcher/switcher.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';

// POSTS
import { SinglePostComponent } from './single-post/single-post.component';

import { ModalComponent } from 'src/app/core/modal.directive';

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
  ],
  exports: [
    MainNavigationComponent,
    FormsModule,
    SwitcherComponent,
    SinglePostComponent,
    ModalComponent,
  ]
})
export class SharedModule { }
