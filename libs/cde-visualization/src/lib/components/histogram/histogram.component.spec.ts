global.structuredClone = (val) => JSON.parse(JSON.stringify(val));

import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/angular';

import { HistogramComponent } from './histogram.component';

describe('HistogramComponent', () => {
  it('should render histogram', async () => {
    await render(HistogramComponent, {
      componentInputs: {
        nodes: [
          { x: 0, y: 0, 'Cell Type': 'aaaaa' },
          { x: 0, y: 2, 'Cell Type': 'bbbbb' },
          { x: 0, y: 3, 'Cell Type': 'ccccc' },
        ],
        nodeTargetKey: 'Cell Type',
        edges: [
          { sourceNode: 0, x0: 0, y0: 0, z0: 3, x1: 4, y1: 5, z1: 6 },
          { sourceNode: 1, x0: 0, y0: 2, z0: 3, x1: 4, y1: 5, z1: 6 },
          { sourceNode: 2, x0: 0, y0: 3, z0: 3, x1: 4, y1: 5, z1: 6 },
        ],

        selectedCellType: 'aaaaa',
        cellTypes: [
          { name: 'aaaaa', count: 2, color: [0, 0, 0] },
          { name: 'bbbbb', count: 4, color: [0, 1, 2] },
          { name: 'ccccc', count: 6, color: [0, 1, 3] },
        ],
        cellTypesSelection: ['aaaaa', 'bbbbb'],
      },
    });

    const histogram = screen.getByTestId('histogram');
    expect(histogram).toBeInTheDocument();
  });

  it('should download', async () => {
    const component = await render(HistogramComponent, {
      componentInputs: {
        nodes: [],
        nodeTargetKey: 'key',
        edges: [],
        selectedCellType: 'type',
        cellTypes: [
          { name: 'name', count: 2, color: [0, 0, 0] },
          { name: 'name2', count: 4, color: [0, 1, 2] },
        ],
        cellTypesSelection: ['name', 'name2'],
      },
    });

    component.fixture.componentInstance.download('svg');
  });

  it('should updateColor', async () => {
    const component = await render(HistogramComponent, {
      componentInputs: {
        nodes: [],
        nodeTargetKey: 'key',
        edges: [],
        selectedCellType: 'type',
        cellTypes: [
          { name: 'name', count: 2, color: [0, 0, 0] },
          { name: 'name2', count: 4, color: [0, 1, 2] },
        ],
        cellTypesSelection: ['name', 'name2'],
      },
    });

    component.fixture.componentInstance.updateColor(
      component.fixture.componentInstance.cellTypes()[0],
      [255, 255, 255],
    );
    expect(component.fixture.componentInstance.cellTypes()[0].color).toEqual([255, 255, 255]);
  });

  it('should reset all cell colors', async () => {
    const component = await render(HistogramComponent, {
      componentInputs: {
        nodes: [],
        nodeTargetKey: 'key',
        edges: [],
        selectedCellType: 'type',
        cellTypes: [
          { name: 'name', count: 2, color: [0, 0, 0] },
          { name: 'name2', count: 4, color: [0, 1, 2] },
        ],
        cellTypesSelection: ['name', 'name2'],
      },
    });

    component.fixture.componentInstance.resetAllCellsColor();
  });
});
