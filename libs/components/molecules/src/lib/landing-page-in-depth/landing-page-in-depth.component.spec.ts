import { Shallow } from 'shallow-render';

import { LandingPageInDepthComponent } from './landing-page-in-depth.component';

describe('LandingPageInDepthComponent', () => {
  let shallow: Shallow<LandingPageInDepthComponent>;

  beforeEach(() => {
    shallow = new Shallow(LandingPageInDepthComponent);
  });

  it('renders images correctly', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
