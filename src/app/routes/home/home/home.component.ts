import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    // CAROUSEL PROPS
    public myInterval: number = 5000;
    public noWrapSlides: boolean = false;
    public slides: Array<any> = [];

    constructor() { 
        // init carousel
        this.addSlide(1);
        this.addSlide(2);
        this.addSlide(3);
    }

    ngOnInit() { }

    // CAROUSEL METHODS
    public addSlide(id = 3): void {
        this.slides.push({
            image: 'assets/img/fc' + id + '.png',
            text: `${['More', 'Extra', 'Lots of', 'Surplus'][this.slides.length % 4]}
      ${['Cats', 'Kittys', 'Felines', 'Cutes'][this.slides.length % 4]}`
        });
    }
}
