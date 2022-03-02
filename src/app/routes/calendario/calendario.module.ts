import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarioComponent } from './calendario/calendario.component';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import { FullCalendarModule } from '@fullcalendar/angular';

const routes: Routes = [
  { path: '', component: CalendarioComponent },
]

@NgModule({
  declarations: [
    CalendarioComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FullCalendarModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class CalendarioModule { }
