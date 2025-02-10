import { Shallow } from 'shallow-render';

import { SpatialSearchConfigComponent } from './spatial-search-config.component';

describe('SpatialSearchConfigComponent', () => {
  let shallow: Shallow<SpatialSearchConfigComponent>;

  beforeEach(() => {
    shallow = new Shallow(SpatialSearchConfigComponent);
  });

  it('creates', async () => {
    const { instance } = await shallow.render();
    expect(instance).toBeDefined();
  });
});
