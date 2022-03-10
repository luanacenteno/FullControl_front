import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CommonModule } from '@angular/common';
import { NgxSelectModule } from 'ngx-select-ex'

import { CalendarioComponent } from './calendario/calendario.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: CalendarioComponent },
];

@NgModule({
  declarations: [
    CalendarioComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxSelectModule,
    RouterModule.forChild(routes),
    FullCalendarModule
  ],
  exports: [
    RouterModule
]
})
export class CalendarioModule { }
