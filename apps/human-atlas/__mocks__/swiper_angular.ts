import { Component, Input, NgModule } from '@angular/core';
import { Shallow } from 'shallow-render';

/** Mock component for the swiper */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'swiper',
  template: '<ng-content></ng-content>',
})
class SwiperComponent {
  /** Configuration for the Swiper */
  @Input() config: any;
}

@NgModule({
  declarations: [SwiperComponent],
  exports: [SwiperComponent],
})
export class SwiperModule {}

Shallow.neverMock(SwiperComponent, SwiperModule);
