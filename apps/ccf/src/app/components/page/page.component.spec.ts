import { ErrorHandler } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concat, of, throwError } from 'rxjs';
import { Shallow } from 'shallow-render';
import { ContentService } from '../../services/content/content.service';
import { PageComponent } from './page.component';
import { PageModule } from './page.module';

describe('PageComponent', () => {
  let shallow: Shallow<PageComponent>;

  beforeEach(async () => {
    shallow = new Shallow(PageComponent, PageModule)
      .mock(ActivatedRoute, {
        url: of([]),
      })
      .mock(ContentService, {
        getContent: jest.fn().mockReturnValue(of('file')),
      })
      .mock(ErrorHandler, {
        handleError: jest.fn(),
      });

    jest.spyOn(window, 'scroll').mockImplementation(() => undefined);

    jest.clearAllMocks();
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
