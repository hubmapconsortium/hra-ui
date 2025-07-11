import { Shallow } from 'shallow-render';

import { SizeLegendComponent } from './size-legend.component';

describe('SizeLegendComponent', () => {
  let shallow: Shallow<SizeLegendComponent>;

  beforeEach(() => {
    shallow = new Shallow(SizeLegendComponent);
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });
});
