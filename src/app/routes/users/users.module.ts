import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';


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
    SharedModule,
    AgGridModule.withComponents([ListarComponent]),
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
