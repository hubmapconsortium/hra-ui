import { Shallow } from 'shallow-render';

import { InfoModalComponent } from './info-modal.component';

describe('InfoModalComponent', () => {
  let shallow: Shallow<InfoModalComponent>;

  beforeEach(() => {
    shallow = new Shallow(InfoModalComponent);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
