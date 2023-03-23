import { Shallow } from 'shallow-render';
import { FtuFooterBehavioralComponent } from './ftu-footer-behavioral.component';

describe('FtuFooterBehavioralComponent', () => {
  let shallow: Shallow<FtuFooterBehavioralComponent>;

  beforeEach(() => {
    shallow = new Shallow(FtuFooterBehavioralComponent);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
