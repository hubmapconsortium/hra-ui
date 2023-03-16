import { LandingPageIntroComponent } from '@hra-ui/components/molecules';
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

  it('should call exploreFTU function on moreClick event emit', async () => {
    const { findComponent } = await shallow.render();
    const landingPageIntroComponent = findComponent(LandingPageIntroComponent);
    landingPageIntroComponent.moreClick.emit();
  });
});
