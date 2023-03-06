import { Shallow } from 'shallow-render';

import { FullscreenContentComponent } from './fullscreen-content.component';

describe('FullscreenContentComponent', () => {
  let shallow: Shallow<FullscreenContentComponent>;
  beforeEach(() => {
    shallow = new Shallow(FullscreenContentComponent);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
