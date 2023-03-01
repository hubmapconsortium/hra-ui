import { Shallow } from 'shallow-render';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let shallow: Shallow<HeaderComponent>;
  beforeEach(() => {
    shallow = new Shallow(HeaderComponent);
  });

  it('renders images correctly', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
