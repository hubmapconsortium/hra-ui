import { Shallow } from 'shallow-render';

import { LandingPageContentComponent } from './landing-page-content.component';

describe('LandingPageContentComponent', () => {
  let shallow: Shallow<LandingPageContentComponent>;

  beforeEach(async () => {
    shallow = new Shallow(LandingPageContentComponent);
  });

  it('should create LandingPageContentComponent', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
