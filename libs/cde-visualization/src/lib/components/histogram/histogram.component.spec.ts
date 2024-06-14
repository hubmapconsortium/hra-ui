import { TestBed } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { mockClear, mockDeep } from 'jest-mock-extended';
import embed, { Result } from 'vega-embed';

import { CellTypeEntry } from '../../models/cell-type';
import { EdgeEntry } from '../../models/edge';
import { DEFAULT_NODE_TARGET_KEY, NodeEntry } from '../../models/node';
import { FileSaverService } from '../../services/file-saver/file-saver.service';
import { HistogramComponent } from './histogram.component';
import { WritableSignal } from '@angular/core';
import { Rgb } from '../../models/color';

jest.mock('vega-embed', () => ({ default: jest.fn() }));

describe('HistogramComponent', () => {
  const nodeTargetKey = DEFAULT_NODE_TARGET_KEY;
  function createNodeEntry(target: string, x: number, y: number): NodeEntry {
    return { [nodeTargetKey]: target, x, y } as NodeEntry;
  }

  const sampleNodes = [createNodeEntry('a', 0, 0), createNodeEntry('b', 0, 2), createNodeEntry('c', 0, 4)];
  const sampleEdges: EdgeEntry[] = [
    [0, 0, 0, 3, 4, 5, 6],
    [1, 0, 2, 3, 4, 5, 6],
    [2, 0, 4, 3, 4, 5, 6],
  ];
  const sampleCellTypes: CellTypeEntry[] = [
    { name: 'a', count: 2, color: [0, 0, 0] },
    { name: 'b', count: 4, color: [0, 1, 2] },
    { name: 'c', count: 6, color: [0, 1, 3] },
  ];
  const sampleCellTypesSelection: string[] = [sampleCellTypes[0].name, sampleCellTypes[1].name];

  const embedResult = mockDeep<Result>();

  beforeEach(() => {
    if (document.fonts === undefined) {
      Object.defineProperty(document, 'fonts', {
        value: mockDeep(),
      });
    }

    jest.mocked(embed).mockReturnValue(Promise.resolve(embedResult));
    embedResult.view.data.mockReturnThis();
    embedResult.view.signal.mockReturnThis();
  });

  afterEach(() => {
    mockClear(embedResult);
  });

  it('should render the histogram using vega', async () => {
    const { fixture } = await render(HistogramComponent, {
      componentInputs: {
        nodes: sampleNodes,
        nodeTargetKey,
        edges: sampleEdges,
        selectedCellType: sampleNodes[0][nodeTargetKey],
        cellTypes: sampleCellTypes,
        cellTypesSelection: sampleCellTypesSelection,
      },
    });
    await fixture.whenStable();

    const container = screen.getByTestId('histogram');
    expect(embed).toHaveBeenCalledWith(container, expect.anything(), expect.anything());
  });

  it('should set empty data when nodes or edges are empty', async () => {
    const { fixture } = await render(HistogramComponent, {
      componentInputs: {
        nodes: [],
        nodeTargetKey,
        edges: [],
        selectedCellType: sampleNodes[0][nodeTargetKey],
        cellTypes: sampleCellTypes,
        cellTypesSelection: sampleCellTypesSelection,
      },
    });
    await fixture.whenStable();

    expect(embedResult.view.data).toHaveBeenCalledWith('data', []);
  });

  it('should download in the specified format', async () => {
    await render(HistogramComponent, {
      componentInputs: {
        nodes: [],
        nodeTargetKey,
        edges: [],
        selectedCellType: '',
        cellTypes: [],
        cellTypesSelection: [],
      },
    });

    const fileSaver = TestBed.inject(FileSaverService);
    const fileSaveSpy = jest.spyOn(fileSaver, 'save');

    const imageUrl = 'data:foo';
    embedResult.view.toImageURL.mockReturnValue(Promise.resolve(imageUrl));

    const downloadSvgButton = screen.getByText(/svg/i);
    await userEvent.click(downloadSvgButton);

    expect(fileSaveSpy).toHaveBeenCalledWith(imageUrl, 'cde-histogram.svg');
  });

  it('should updateColor', async () => {
    const {
      fixture: { componentInstance: instance },
    } = await render(HistogramComponent, {
      componentInputs: {
        nodes: [],
        nodeTargetKey: 'key',
        edges: [],
        selectedCellType: 'type',
        cellTypes: sampleCellTypes,
        cellTypesSelection: sampleCellTypesSelection,
      },
    });

    instance.updateColor(sampleCellTypes[0], [255, 255, 255]);
    expect(instance.cellTypes()[0].color).toEqual([255, 255, 255]);
  });

  it('should reset all cell colors', async () => {
    const {
      fixture: { componentInstance: instance },
    } = await render(HistogramComponent, {
      componentInputs: {
        nodes: [],
        nodeTargetKey,
        edges: [],
        selectedCellType: '',
        cellTypes: [],
        cellTypesSelection: [],
      },
    });

    const priedInstance = instance as unknown as { totalCellTypeColor: WritableSignal<Rgb> };
    priedInstance.totalCellTypeColor.set([1, 2, 3]);
    instance.resetAllCellsColor();
    expect(priedInstance.totalCellTypeColor()).toEqual([0, 0, 0]);
  });
});
