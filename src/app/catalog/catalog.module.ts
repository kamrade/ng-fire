import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CatalogPageComponent } from './containers/catalog-page/catalog-page.component';
import { CatalogContentComponent } from './containers/catalog-content/catalog-content.component';

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
    CatalogContentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CatalogModule { }
