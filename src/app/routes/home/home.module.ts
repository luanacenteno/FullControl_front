import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    { path: '', component: HomeComponent },
];

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule.forChild(routes),
        CarouselModule.forRoot(),
    ],
    declarations: [HomeComponent],
    exports: [
        RouterModule,
        CommonModule,
        CarouselModule,
        FormsModule
    ]
})
export class HomeModule { }