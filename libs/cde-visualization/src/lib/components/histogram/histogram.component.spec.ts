import { WritableSignal } from '@angular/core';
// import { TestBed } from '@angular/core/testing';
import { Rgb } from '@hra-ui/design-system/color-picker';
import { provideScrolling } from '@hra-ui/design-system/scrolling';
import { render, RenderComponentOptions, screen } from '@testing-library/angular';
// import userEvent from '@testing-library/user-event';
import { mockClear, mockDeep } from 'jest-mock-extended';
import embed, { Result } from 'vega-embed';

import { DEFAULT_NODE_TARGET_KEY, NodeEntry } from '../../models/node';
// import { FileSaverService } from '../../services/file-saver/file-saver.service';
import { HistogramComponent } from './histogram.component';

jest.mock('vega-embed', () => ({ default: jest.fn() }));

describe('HistogramComponent', () => {
  const nodeTargetKey = DEFAULT_NODE_TARGET_KEY;
  function createNodeEntry(target: string, x: number, y: number): NodeEntry {
    return { [nodeTargetKey]: target, x, y } as NodeEntry;
  }

  const sampleNodes = [createNodeEntry('a', 0, 0), createNodeEntry('b', 0, 2), createNodeEntry('c', 0, 4)];
  const sampleData = [
    {
      type: 'A',
      distance: 5,
    },
    {
      type: 'B',
      distance: 7,
    },
  ];

  const embedResult = mockDeep<Result>();

  async function setup(options?: RenderComponentOptions<HistogramComponent>) {
    return render(HistogramComponent, {
      ...options,
      providers: [provideScrolling({ disableSensor: true }), ...(options?.providers ?? [])],
    });
  }

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
    const { fixture } = await setup({
      componentInputs: {
        data: sampleData,
        colors: [],
        filteredCellTypes: [],
        selectedCellType: sampleNodes[0][nodeTargetKey],
      },
    });
    await fixture.whenStable();

    const container = screen.getByTestId('histogram');
    expect(embed).toHaveBeenCalledWith(container, expect.anything(), expect.anything());
  });

  it('should set empty data when input data is empty', async () => {
    const { fixture } = await setup({
      componentInputs: {
        data: [],
        colors: [],
        filteredCellTypes: [],
        selectedCellType: sampleNodes[0][nodeTargetKey],
      },
    });
    await fixture.whenStable();

    expect(embedResult.view.data).toHaveBeenCalledWith('data', []);
  });

  // it('should download in the specified format', async () => {
  //   await setup({
  //     componentInputs: {
  //       data: [],
  //       colors: [],
  //       filteredCellTypes: [],
  //       selectedCellType: '',
  //     },
  //   });

  //   const fileSaver = TestBed.inject(FileSaverService);
  //   const fileSaveSpy = jest.spyOn(fileSaver, 'save');

  //   const imageUrl = 'data:foo';
  //   embedResult.view.toImageURL.mockReturnValue(Promise.resolve(imageUrl));

  //   const downloadSvgButton = screen.getByText(/svg/i);
  //   await userEvent.click(downloadSvgButton);

  //   expect(fileSaveSpy).toHaveBeenCalledWith(imageUrl, 'cde-histogram.svg');
  // });

  it('should reset all cell colors', async () => {
    const {
      fixture: { componentInstance: instance },
    } = await setup({
      componentInputs: {
        data: [],
        colors: [],
        filteredCellTypes: [],
        selectedCellType: '',
      },
    });

    const priedInstance = instance as unknown as { totalCellTypeColor: WritableSignal<Rgb> };
    priedInstance.totalCellTypeColor.set([1, 2, 3]);
    instance.resetAllCellsColor();
    expect(priedInstance.totalCellTypeColor()).toEqual([0, 0, 0]);
  });
});
