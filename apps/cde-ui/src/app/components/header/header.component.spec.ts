import { HeaderComponent } from './header.component';
import { Shallow } from 'shallow-render';

describe('HeaderComponent', () => {
  let shallow: Shallow<HeaderComponent>;

  beforeEach(async () => {
    shallow = new Shallow(HeaderComponent);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
