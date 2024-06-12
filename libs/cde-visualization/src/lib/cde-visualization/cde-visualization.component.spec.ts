global.structuredClone = (val) => JSON.parse(JSON.stringify(val));

import { render } from '@testing-library/angular';

import { CdeVisualizationComponent } from './cde-visualization.component';

describe('CdeVisualizationComponent', () => {
  it('should update nodes when downloadNodes is called', async () => {
    const component = await render(CdeVisualizationComponent, {
      componentInputs: {
        nodes: 'nodes',
        edges: undefined,
        colorMap: undefined,
        metadata: { set: jest.fn() },
        nodeTargetKey: 'key',
        title: 'Test Title',
        technology: 'Test Technology',
        organ: 'Test Organ',
        sex: 'Test Sex',
        age: 30,
        creationDate: 'Test Date',
        creationTime: 'Test Time',
        thickness: 1,
        pixelSize: 1,
      },
    });

    component.fixture.componentInstance.downloadNodes();
    expect(component.fixture.componentInstance.nodes()).toBeTruthy();
  });

  it('should update edges when downloadEdges is called', async () => {
    const component = await render(CdeVisualizationComponent, {
      componentInputs: {
        nodes: undefined,
        edges: 'edges',
        colorMap: undefined,
        metadata: { set: jest.fn() },
        nodeTargetKey: undefined,
        title: 'Test Title',
        technology: 'Test Technology',
        organ: 'Test Organ',
        sex: 'Test Sex',
        age: 30,
        creationDate: 'Test Date',
        creationTime: 'Test Time',
        thickness: 1,
        pixelSize: 1,
      },
    });

    component.fixture.componentInstance.downloadEdges();
    expect(component.fixture.componentInstance.edges()).toBeTruthy();
  });

  it('should update color map when downloadColorMap is called', async () => {
    const component = await render(CdeVisualizationComponent, {
      componentInputs: {
        nodes: undefined,
        edges: undefined,
        colorMap: 'color map',
        metadata: { set: jest.fn() },
        nodeTargetKey: 'key',
        title: 'Test Title',
        technology: 'Test Technology',
        organ: 'Test Organ',
        sex: 'Test Sex',
        age: 30,
        creationDate: 'Test Date',
        creationTime: 'Test Time',
        thickness: 1,
        pixelSize: 1,
      },
    });

    component.fixture.componentInstance.downloadColorMap();
    expect(component.fixture.componentInstance.colorMap()).toBeTruthy();
  });

  it('should reset cell types and increase reset counter', async () => {
    const component = await render(CdeVisualizationComponent, {
      componentInputs: {
        nodes:
          'https://github.com/hubmapconsortium/hra-ui/tree/cell-distance-explorer/apps/cde-ui/example-data/nodes.csv',
        edges: undefined,
        colorMap:
          'https://github.com/hubmapconsortium/hra-ui/tree/cell-distance-explorer/apps/cde-ui/example-data/color_map.csv',
        metadata: { set: jest.fn() },
        nodeTargetKey: 'key',
        title: 'Test Title',
        technology: 'Test Technology',
        organ: 'Test Organ',
        sex: 'Test Sex',
        age: 30,
        creationDate: 'Test Date',
        creationTime: 'Test Time',
        thickness: 1,
        pixelSize: 1,
      },
    });
    component.fixture.componentInstance.resetCellTypes();
    expect(component.fixture.componentInstance.cellTypesResetCounter()).toEqual(1);
  });
});
