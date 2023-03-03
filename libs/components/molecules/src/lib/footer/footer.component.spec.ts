import { Shallow } from 'shallow-render';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let shallow: Shallow<FooterComponent>;

  beforeEach(() => {
    shallow = new Shallow(FooterComponent);
  });

  it('define', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
