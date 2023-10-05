import { Component, Input, NgModule } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'swiper',
  template: '<ng-content></ng-content>'
})
class SwiperComponent {
  @Input() config: any;
}

@NgModule({
  declarations: [SwiperComponent],
  exports: [SwiperComponent]
})
export class SwiperModule { }
