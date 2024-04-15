import { Shallow } from 'shallow-render';
import { LandingPageComponent } from './landing-page.component';

describe('LandingPageComponent', () => {
  let shallow: Shallow<LandingPageComponent>;

  beforeEach(async () => {
    shallow = new Shallow(LandingPageComponent);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeTruthy();
  });
});
