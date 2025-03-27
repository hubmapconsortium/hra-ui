import { ResizeSensor } from 'css-element-queries';
import { mock } from 'jest-mock-extended';
import { from, of } from 'rxjs';
import { Shallow } from 'shallow-render';
import { ModelState, ViewSide, ViewType } from '../../core/store/model/model.state';
import { PageState } from '../../core/store/page/page.state';
import { RegistrationState } from '../../core/store/registration/registration.state';
import { SceneState } from '../../core/store/scene/scene.state';
import { ContentComponent } from './content.component';
import { ContentModule } from './content.module';

jest.mock('css-element-queries', () => ({
  ResizeSensor: jest.fn(() => mock()),
}));

describe('ContentComponent', () => {
  let shallow: Shallow<ContentComponent>;

  beforeEach(() => {
    shallow = new Shallow(ContentComponent, ContentModule)
      .mock(ModelState, {
        viewType$: of('register' as ViewType),
        viewSide$: of('anterior' as ViewSide),
        position$: of({ x: 0, y: 0, z: 0 }),
        organDimensions$: of({ x: 0, y: 0, z: 0 }),
        defaultPosition: { x: 0, y: 0, z: 0 },
        setViewType: jest.fn(),
      })
      .mock(PageState, {})
      .mock(RegistrationState, {})
      .mock(SceneState, { nodes$: from([]) });
  });

  describe('.setViewType(is3DView)', () => {
    it('set view type to 3d when is3DView is true', async () => {
      const { instance, inject } = await shallow.render();
      instance.setViewType(true);
      expect(inject(ModelState).setViewType).toHaveBeenCalledWith('3d');
    });

    it('set view type to register when is3DView is false', async () => {
      const { instance, inject } = await shallow.render();
      instance.setViewType(false);
      expect(inject(ModelState).setViewType).toHaveBeenCalledWith('register');
    });
  });

  describe('.isNarrowView', () => {
    function getSensorCallback(): (size: { width: number; height: number }) => void {
      return jest.mocked(ResizeSensor).mock.lastCall?.[1] ?? (() => undefined);
    }

    it('should be set when the view width is less than a predefined value', async () => {
      const { instance } = await shallow.render();
      getSensorCallback()({ width: 10, height: 10 });
      expect(instance.isNarrowView).toBeTruthy();
    });

    it('should be unset when the view width is larger or equal to a predefined value', async () => {
      const { instance } = await shallow.render();
      getSensorCallback()({ width: 10000000, height: 10 });
      expect(instance.isNarrowView).toBeFalsy();
    });
  });
});
