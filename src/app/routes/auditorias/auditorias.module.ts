import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditoriasComponent } from './auditorias/auditorias.component';

import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';


const routes: Routes = [
  { path: '', component: AuditoriasComponent }
];

@NgModule({
  declarations: [
    AuditoriasComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
]
})
export class AuditoriasModule { }
