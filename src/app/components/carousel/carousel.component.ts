import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import SwiperCore, { Autoplay, Pagination, Navigation, Swiper } from "swiper";

SwiperCore.use([Autoplay, Pagination, Navigation]);


@Component({
  selector: 'ccf-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CarouselComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }



}
