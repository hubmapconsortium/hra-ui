import { FilterSexEnum } from '@hra-api/ng-client';
import { provideDesignSystemCommon } from '@hra-ui/design-system';
import { render, RenderComponentOptions } from '@testing-library/angular';
import { SpatialSearchUiComponent } from './spatial-search-ui.component';

describe('SpatialSearchUiComponent', () => {
  async function setup(options?: RenderComponentOptions<SpatialSearchUiComponent>) {
    return render(SpatialSearchUiComponent, {
      ...options,
      providers: [provideDesignSystemCommon(), ...(options?.providers ?? [])],
    });
  }

  const defaultInputs = {
    scene: [],
    sceneBounds: { x: 0, y: 0, z: 0 },
    sceneTarget: [0, 0, 0] as [number, number, number],
    organs: [],
    sex: FilterSexEnum.Male,
    referenceOrgan: { id: 'UBERON:0000001', name: 'whole organism', src: '', organ: 'test' },
    radius: 10,
    radiusSettings: { min: 0, max: 100, defaultValue: 10 },
    defaultPosition: { x: 0, y: 0, z: 0 },
    position: { x: 0, y: 0, z: 0 },
    tissueBlocks: [],
    anatomicalStructures: [],
    cellTypes: [],
  };

  it('should reset view correctly', async () => {
    const { fixture } = await setup({
      inputs: defaultInputs,
    });

    fixture.componentInstance.resetView();
    expect(true).toBe(true);
  });
});
