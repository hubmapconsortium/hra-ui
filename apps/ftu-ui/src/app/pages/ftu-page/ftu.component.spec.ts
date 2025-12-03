import { ActivatedRoute } from '@angular/router';
import { dispatch, injectDestroy$, selectSnapshot } from '@hra-ui/cdk/injectors';
import { FtuFullScreenService } from '@hra-ui/ftu-ui-components';
import { EMPTY, of } from 'rxjs';
import { signal, TemplateRef } from '@angular/core';
import { Shallow } from 'shallow-render';
import { FtuComponent } from './ftu.component';

jest.mock('@hra-ui/cdk/injectors');
jest.mocked(injectDestroy$).mockReturnValue(EMPTY);
jest.mocked(dispatch).mockReturnValue(jest.fn());

describe('FtuComponent', () => {
  let shallow: Shallow<FtuComponent>;
  let mockFullscreenService: FtuFullScreenService;

  beforeEach(() => {
    // Create mock fullscreen service
    mockFullscreenService = {
      isFullscreen: signal<boolean>(false),
      fullscreentabIndex: signal<number>(0),
    } as unknown as FtuFullScreenService;

    shallow = new Shallow(FtuComponent)
      .mock(ActivatedRoute, { queryParams: of({ id: 'abc' }) })
      .mock(FtuFullScreenService, mockFullscreenService);
    jest.mocked(selectSnapshot).mockReturnValue(jest.fn());
  });

  it('should create component', async () => {
    expect(shallow.render()).resolves.toBeDefined();
  });

  it('should close fullscreen mode when closefullscreen() is called', async () => {
    const { instance } = await shallow.render();

    (
      instance as unknown as {
        fullscreenService?: FtuFullScreenService;
      }
    ).fullscreenService = mockFullscreenService;

    mockFullscreenService.isFullscreen.set(true);
    expect(mockFullscreenService.isFullscreen()).toBe(true);

    instance.closefullscreen();

    expect(mockFullscreenService.isFullscreen()).toBe(false);
  });

  it('should set sourceListTemplate when setSourceList() is called', async () => {
    const { instance } = await shallow.render();

    const mockTemplateRef = {} as TemplateRef<unknown>;

    expect(instance.sourceListTemplate).toBeNull();

    instance.setSourceList(mockTemplateRef);

    expect(instance.sourceListTemplate).toBe(mockTemplateRef);
  });
});
