import { Shallow } from 'shallow-render';
import { FullscreenContainerComponent } from './fullscreen-container.component';
import { TestBed } from '@angular/core/testing';

describe('FullscreenContainerComponent', () => {
  let shallow: Shallow<FullscreenContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
    });

    shallow = new Shallow(FullscreenContainerComponent).dontMock(FullscreenContainerComponent);
  });

  it('should render FullscreenContainerComponent', async () => {
    const { findComponent } = await shallow.render();
    expect(findComponent(FullscreenContainerComponent)).toHaveFoundOne();
  });
});
