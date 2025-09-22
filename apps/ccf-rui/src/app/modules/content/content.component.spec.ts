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

  it('should render content', async () => {
    const { instance } = await shallow.render();
    expect(instance).toBeTruthy();
  });
});
