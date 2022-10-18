import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from "@angular/core";
import { CarouselComponent } from "./carousel.component";
import { MatButtonModule } from '@angular/material/button';
import { SwiperModule } from "swiper/angular";


@NgModule({
    declarations: [CarouselComponent],
    imports: [
        SwiperModule,
        MatButtonModule,
        BrowserModule
    ],
    exports: [
        CarouselComponent
    ]
})

export class CarouselModule { }