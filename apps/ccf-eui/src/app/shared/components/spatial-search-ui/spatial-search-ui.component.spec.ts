import { Shallow } from 'shallow-render';

import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SpatialSearchUiComponent } from './spatial-search-ui.component';
import { SpatialSearchUiModule } from './spatial-search-ui.module';

describe('SpatialSearchUiComponent', () => {
  let shallow: Shallow<SpatialSearchUiComponent>;

  beforeEach(() => {
    shallow = new Shallow(SpatialSearchUiComponent, SpatialSearchUiModule).provide(provideHttpClientTesting());
  });

  it('creates', async () => {
    const { instance } = await shallow.render({
      bind: {
        sex: 'male',
        referenceOrgan: { name: 'organ' },
        radius: 2,
        radiusSettings: {
          min: 2,
          max: 20,
          defaultValue: 2,
        },
        defaultPosition: {
          x: 0,
          y: 0,
          z: 0,
        },
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
        tissueBlocks: [],
      },
    });
    expect(instance).toBeDefined();
  });
});
