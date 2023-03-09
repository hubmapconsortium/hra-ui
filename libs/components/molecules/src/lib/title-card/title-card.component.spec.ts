import { Shallow } from 'shallow-render';

import { TitleCardComponent } from './title-card.component';

describe('TitleCardComponent', () => {
  let shallow: Shallow<TitleCardComponent>;

  beforeEach(() => {
    shallow = new Shallow(TitleCardComponent);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
