import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { ListarComponent } from './listar/listar.component';
import { CrearComponent } from './crear/crear.component';

const routes: Routes = [
  { path: 'listar', component: ListarComponent},
  { path: 'crear', component: CrearComponent}
];

@NgModule({
  
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    ListarComponent,
    CrearComponent
  ],
  exports: [
    RouterModule
  ]
 
})
export class UsersModule { }
