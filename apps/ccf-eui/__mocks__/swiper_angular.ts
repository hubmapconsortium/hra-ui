import { Component, NgModule } from '@angular/core';
import { Shallow } from 'shallow-render';

/** Mock component for swiper */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'swiper',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line
  inputs: ['config', 'navigation'],
  standalone: false,
})
export class SwiperComponent {}

@NgModule({
  declarations: [SwiperComponent],
  exports: [SwiperComponent],
})
export class SwiperModule {}

Shallow.neverMock(SwiperComponent, SwiperModule);
