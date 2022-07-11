import { NgModule } from "@angular/core";
import { CarouselComponent } from "./carousel.component";
import { SwiperModule } from "swiper/angular";


@NgModule({
    declarations: [CarouselComponent],
    imports: [
        SwiperModule
    ],
    exports: [
        CarouselComponent
    ]
})

export class CarouselModule{}