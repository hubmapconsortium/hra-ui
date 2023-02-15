import { Shallow } from 'shallow-render';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let shallow: Shallow<HeaderComponent>;
  const logoSrc = '/src/assets/logo.svg';
  const infoSrc = '/src/assets/info.svg';
  beforeEach(() => {
    shallow = new Shallow(HeaderComponent);
  });

  it('renders images correctly', async () => {
    const { instance } = await shallow.render({
      bind: { logo: logoSrc, info: infoSrc },
    });

    expect(instance.logo).toBe(logoSrc);
    expect(instance.info).toBe(infoSrc);
  });
});
