import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BromatologiaComponent } from './bromatologia/bromatologia.component';

import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';


const routes: Routes = [
  { 
    path: 'bromatologia', 
    component: BromatologiaComponent 
  }
];

@NgModule({
  declarations: [
    BromatologiaComponent,
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
