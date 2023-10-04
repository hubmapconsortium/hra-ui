import { Component, Input, NgModule } from '@angular/core';
import { CarouselComponent } from './carousel.component';
import { CarouselModule } from './carousel.module';
import { Shallow } from 'shallow-render';

jest.mock('swiper', () => {
  return {
    default: {
      use() { }
    },
    angular: {}
  }
})

jest.mock('swiper/angular/swiper-angular', () => {
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
  class SwiperModule { }

  return { SwiperModule }
})

describe('CarouselComponent', () => {
  let shallow: Shallow<CarouselComponent>

  beforeEach(async () => {
    shallow = new Shallow(CarouselComponent, CarouselModule)
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
