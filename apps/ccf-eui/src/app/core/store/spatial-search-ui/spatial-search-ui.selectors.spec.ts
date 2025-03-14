import { SpatialSearchUiSelectors } from './spatial-search-ui.selectors';
import { RadiusSettings, SpatialSearchSex } from './spatial-search-ui.state';

describe('SpatialSearchUiSelectors', () => {
  const model = {
    sex: 'female' as SpatialSearchSex,
    referenceOrgans: [{ organ: 'Heart', name: 'Heart', src: '' }],
    executeSearchOnGeneration: true,
    organId: 'testId',
    organ: SpatialSearchUiSelectors.organ('', [{ organ: 'Heart', name: 'Heart', src: '' }]),
    position: { x: 1, y: 1, z: 1 },
    defaultPosition: { x: 0, y: 0, z: 0 },
    radius: 5,
    radiusSettings: { min: 0, max: 10, defaultValue: 5 } as RadiusSettings,
    organScene: [{ name: 'test' }],
    tissueBlocks: [
      {
        spatialEntityId: 'testId',
        sampleType: 'test',
        label: 'test',
        link: 'test',
        datasets: [{ label: 'test', link: 'test' }],
      },
    ],
    anatomicalStructures: { child: 5 },
    cellTypes: { type: 10 },
  };

  it('should return the sex', async () => {
    const message = SpatialSearchUiSelectors.sex(model);
    expect(message).toEqual('female');
  });

  it('should return reference organs', async () => {
    const organs = SpatialSearchUiSelectors.referenceOrgans(model);
    expect(organs).toEqual([{ organ: 'Heart', name: 'Heart', src: '' }]);
  });

  it('should return organId', async () => {
    const organId = SpatialSearchUiSelectors.organId(model);
    expect(organId).toEqual('testId');
  });

  it('should return an organ in an organ list', async () => {
    const organ = SpatialSearchUiSelectors.organ('testId', [{ organ: 'Heart', name: 'Heart', src: '' }]);
    expect(organ).toBeUndefined();
  });

  it('should return a list of organs filtered by sex', async () => {
    const organs = SpatialSearchUiSelectors.organs('female', [{ organ: 'Heart', name: 'Heart', src: '', sex: 'male' }]);
    expect(organs).toHaveLength(0);
  });

  it('should return position', async () => {
    const position = SpatialSearchUiSelectors.position(model);
    expect(position).toEqual({ x: 1, y: 1, z: 1 });
  });

  it('should return default position', async () => {
    const defaultPosition = SpatialSearchUiSelectors.defaultPosition(model);
    expect(defaultPosition).toEqual({ x: 0, y: 0, z: 0 });
  });

  it('should return radius', async () => {
    const radius = SpatialSearchUiSelectors.radius(model);
    expect(radius).toEqual(5);
  });

  it('should return radius settings', async () => {
    const radiusSettings = SpatialSearchUiSelectors.radiusSettings(model);
    expect(radiusSettings).toEqual({ min: 0, max: 10, defaultValue: 5 });
  });

  it('should return scene', async () => {
    const scene = SpatialSearchUiSelectors.scene(
      model,
      { x_dimension: 1, y_dimension: 2, z_dimension: 3, dimension_units: 'mm' },
      { x: 1, y: 1, z: 1 },
      5,
    );
    expect(scene.length).toEqual(20);
  });

  it('should return sceneBounds', async () => {
    const sceneBounds = SpatialSearchUiSelectors.sceneBounds({
      x_dimension: 1,
      y_dimension: 2,
      z_dimension: 3,
      dimension_units: 'mm',
    });
    expect(sceneBounds).toEqual({ x: 0.00226, y: 0.00326, z: 0.00426 });
  });

  it('should return sceneTarget', async () => {
    const sceneTarget = SpatialSearchUiSelectors.sceneTarget({
      x_dimension: 1,
      y_dimension: 2,
      z_dimension: 3,
      dimension_units: 'mm',
    });
    expect(sceneTarget).toEqual([0.0005, 0.001, 0.0015]);
  });

  it('should return tissueBlocks', async () => {
    const tissueBlocks = SpatialSearchUiSelectors.tissueBlocks(model);
    expect(tissueBlocks).toEqual([
      {
        spatialEntityId: 'testId',
        sampleType: 'test',
        label: 'test',
        link: 'test',
        datasets: [{ label: 'test', link: 'test' }],
      },
    ]);
  });

  it('should return anatomicalStructures', async () => {
    const anatomicalStructures = SpatialSearchUiSelectors.anatomicalStructures(model, {
      root: 'root',
      nodes: { child: { id: 'child' } },
    });
    expect(anatomicalStructures).toEqual([{ '@id': 'child', count: 5, label: 'child' }]);
  });

  it('should return cellTypes', async () => {
    const cellTypes = SpatialSearchUiSelectors.cellTypes(model, {
      root: 'root',
      nodes: { type: { id: 'type' } },
    });
    expect(cellTypes).toEqual([{ '@id': 'type', count: 10, label: 'type' }]);
  });
});
