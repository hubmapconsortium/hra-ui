import { Shallow } from 'shallow-render';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let shallow: Shallow<FooterComponent>;

  beforeEach(async () => {
    shallow = new Shallow(FooterComponent);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
