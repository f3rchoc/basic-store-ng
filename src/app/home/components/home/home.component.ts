import { Component, OnInit, AfterViewInit } from '@angular/core';

import Swiper, {Navigation} from 'swiper';
// import 'swiper/swiper-bundle.css';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  mySwiper: Swiper;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    Swiper.use([Navigation]);
    this.mySwiper = new Swiper('.swiper-container', {
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    });
  }

}
