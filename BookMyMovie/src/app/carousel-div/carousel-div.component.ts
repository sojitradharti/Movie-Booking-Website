import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel-div',
  templateUrl: './carousel-div.component.html',
  styleUrls: ['./carousel-div.component.scss']
})
export class CarouselDivComponent implements OnInit {
items: Array<any>=[];
  constructor() {
    // array of image items that gets rendered in the carousel
    this.items = [
      { name: 'assets/Images/img11.jpg' },
      { name: 'assets/Images/img22.jpg' },
      { name: 'assets/Images/img33.jpg' },
      { name: 'assets/Images/img44.jpg' },
      { name: 'assets/Images/img55.jpg' }
    ]
  }

  ngOnInit() {
  }

}