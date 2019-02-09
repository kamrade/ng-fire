import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IconsModule } from 'src/app/icons/icons.module';

import { EntitiesPageComponent } from './containers/entities-page/entities-page.component';

import { EntitiesComponent } from './components/entities/entities.component';
import { EntityCardComponent } from './components/entity-card/entity-card.component';
import { NewEntityComponent } from './components/new-entity/new-entity.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { ClientsListComponent } from './components/clients-list/clients-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';

const routes: Routes = [{
  path: '',
  component: EntitiesPageComponent,
  children: [{
    path: '',
    redirectTo: 'status',
    pathMatch: 'full'
  }, {
    path: ':id',
    component: EntitiesComponent
  }]
}];


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    IconsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    EntitiesPageComponent,
    EntitiesComponent,
    EntityCardComponent,
    NewEntityComponent,
    ClientFormComponent,
    ClientsListComponent,
    UserDetailsComponent,
  ],
  exports: [
    EntitiesPageComponent,
    EntitiesComponent,
    EntityCardComponent,
    NewEntityComponent,
    ClientFormComponent,
    ClientsListComponent,
    UserDetailsComponent,
  ]
})
export class EntitiesModule { }
