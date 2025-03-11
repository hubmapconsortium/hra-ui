import { Component, Input, NgModule } from '@angular/core';
import { Shallow } from 'shallow-render';

/** Mock component for swiper */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'swiper',
  template: '<ng-content></ng-content>',
  standalone: false,
})
export class SwiperComponent {
  /** Configuration for Swiper */
  @Input() config: unknown;
}

@NgModule({
  declarations: [SwiperComponent],
  exports: [SwiperComponent],
})
export class SwiperModule {}

Shallow.neverMock(SwiperComponent, SwiperModule);
