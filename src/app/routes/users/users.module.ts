import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', component: UsersComponent }
];


@NgModule({
  
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    UsersComponent
  ],
  exports: [
    RouterModule
  ]
 
})
export class UsersModule { }
