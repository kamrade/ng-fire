import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from 'src/app/profile/profile/profile.component';
import { IconsModule } from 'src/app/icons/icons.module';

const routes: Routes = [{
  path: '',
  component: ProfileComponent,
  pathMatch: 'full'
}];

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    IconsModule,
    RouterModule.forChild(routes)
  ]
})
export class ProfileModule { }
