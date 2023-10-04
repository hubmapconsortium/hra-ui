import { Component, ErrorHandler, Input, NgModule } from '@angular/core';
import { PageComponent } from './page.component';
import { PageModule } from './page.module';
import { Shallow } from 'shallow-render';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../../services/content/content.service';
import { concat, of, throwError } from 'rxjs';


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

describe('PageComponent', () => {
  let shallow: Shallow<PageComponent>;

  beforeEach(async () => {
    shallow = new Shallow(PageComponent, PageModule)
      .mock(ActivatedRoute, {
        url: of([])
      })
      .mock(ContentService, {
        getContent: jest.fn().mockReturnValue(
          concat(of('file'), throwError(() => new Error()))
        )
      })
      .mock(ErrorHandler, {
        handleError: jest.fn()
      })
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });

  describe('resolveData()', () => {
    it('handles content fetching errors', async () => {
      const { inject } = await shallow.render();
      const errorHandler = inject(ErrorHandler);
      expect(errorHandler.handleError).toHaveBeenCalled();
    })
  })
});
