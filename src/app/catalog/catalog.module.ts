import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from 'src/app/shared/shared.module';

import { CatalogPageComponent } from './containers/catalog-page/catalog-page.component';
import { CatalogContentComponent } from './containers/catalog-content/catalog-content.component';
import { ReactiveFormTestComponent } from './components/reactive-form-test/reactive-form-test.component';
import { ReactiveFormsValidateComponent } from './components/reactive-forms-validate/reactive-forms-validate.component';
import { ClientsBlockComponent } from './components/clients-block/clients-block.component';
import { NewClientFormComponent } from './components/new-client-form/new-client-form.component';

const routes: Routes = [{
  path: '',
  component: CatalogPageComponent,
  children: [{
    path: '',
    redirectTo: 'clients',
    pathMatch: 'full'
  }, {
    path: ':id',
      component: CatalogContentComponent
  }]
}];

@NgModule({
  declarations: [
    CatalogPageComponent,
    CatalogContentComponent,
    ReactiveFormTestComponent,
    ReactiveFormsValidateComponent,
    ClientsBlockComponent,
    NewClientFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // BrowserAnimationsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class CatalogModule { }
