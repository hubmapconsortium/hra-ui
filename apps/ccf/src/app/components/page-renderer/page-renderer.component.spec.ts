import { PageRendererComponent } from './page-renderer.component';
import { Shallow } from 'shallow-render';
import { PageRendererModule } from './page-renderer.module';
import { Component, Input, NgModule } from '@angular/core';

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

describe('PageRendererComponent', () => {
  let shallow: Shallow<PageRendererComponent>;

  beforeEach(async () => {
    shallow = new Shallow(PageRendererComponent, PageRendererModule)
  });

  it('should create', async() => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
