import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BromatologiaComponent } from './bromatologia/bromatologia.component';
import { AgGridModule } from 'ag-grid-angular';

import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AuditoriasComponent } from './auditorias.component';
import { BtnCellRenderer } from './btn-cell-renderer';
import { DetalleComponent } from './detalle/detalle.component';


const routes: Routes = [
  { 
    path: 'bromatologia', 
    component: BromatologiaComponent 
  },
  { 
    path: '', 
    component: AuditoriasComponent 
  },
  { 
    path: ':id', 
    component: DetalleComponent 
  }
];

@NgModule({
  declarations: [
    BromatologiaComponent,
    AuditoriasComponent,
    DetalleComponent,
    BtnCellRenderer
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    AgGridModule.withComponents([AuditoriasComponent, BtnCellRenderer]),
  ],
  exports: [
    RouterModule
]
})
export class AuditoriasModule { }
