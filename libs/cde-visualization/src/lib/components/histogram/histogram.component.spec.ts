import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { WritableSignal } from '@angular/core';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { MatMenuHarness } from '@angular/material/menu/testing';
import { Rgb } from '@hra-ui/design-system/color-picker';
import { provideScrolling } from '@hra-ui/design-system/scrolling';
import { render, RenderComponentOptions, screen } from '@testing-library/angular';
import { mockClear, mockDeep } from 'jest-mock-extended';
import embed, { Result } from 'vega-embed';
import { FileSaverService } from '../../services/file-saver/file-saver.service';
import { HistogramComponent } from './histogram.component';

jest.mock('vega-embed', () => ({ default: jest.fn() }));

describe('HistogramComponent', () => {
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
      inputs: {
        data: sampleData,
        colors: [],
        filteredCellTypes: [],
      },
    });
    await fixture.whenStable();

    const container = screen.getByTestId('portal-content');
    expect(embed).toHaveBeenCalledWith(container, expect.anything(), expect.anything());
  });

  it('should set empty data when input data is empty', async () => {
    const { fixture } = await setup({
      inputs: {
        data: [],
        colors: [],
        filteredCellTypes: [],
      },
    });
    await fixture.whenStable();

    expect(embedResult.view.data).toHaveBeenCalledWith('data', []);
  });

  it('should download in the specified format', fakeAsync(async () => {
    const { fixture } = await setup({
      inputs: {
        data: [],
        colors: [],
        filteredCellTypes: [],
      },
    });

    const fileSaver = TestBed.inject(FileSaverService);
    const fileSaveSpy = jest.spyOn(fileSaver, 'save');

    const imageUrl = 'data:foo';
    embedResult.view.toImageURL.mockReturnValue(Promise.resolve(imageUrl));

    const loader = TestbedHarnessEnvironment.loader(fixture);
    const menu = await loader.getHarness(MatMenuHarness);
    await menu.clickItem({ text: /Downloads/i }, { text: /svg/i });

    expect(fileSaveSpy).toHaveBeenCalledWith(imageUrl, 'cde-histogram.svg');
  }));

  it('should reset all cell colors', async () => {
    const {
      fixture: { componentInstance: instance },
    } = await setup({
      inputs: {
        data: [],
        colors: [],
        filteredCellTypes: [],
      },
    });

    const priedInstance = instance as unknown as { totalCellTypeColor: WritableSignal<Rgb> };
    priedInstance.totalCellTypeColor.set([1, 2, 3]);
    instance.resetAllCellsColor();
    expect(priedInstance.totalCellTypeColor()).toEqual([0, 0, 0]);
  });
});
