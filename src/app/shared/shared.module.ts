import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IconsModule } from '../icons/icons.module';

import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { NewEntityComponent } from './new-entity/new-entity.component';
import { EntityCardComponent } from './entity-card/entity-card.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    IconsModule,
    FormsModule
  ],
  declarations: [
    MainNavigationComponent,
    NewEntityComponent,
    EntityCardComponent
  ],
  exports: [
    MainNavigationComponent,
    NewEntityComponent,
    EntityCardComponent,
    FormsModule
  ]
})
export class SharedModule { }
