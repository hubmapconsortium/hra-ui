import { AnimationDriver } from '@angular/animations/browser';
import { MockAnimationDriver } from '@angular/animations/browser/testing';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Signal, WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAssetHref } from '@hra-ui/common/url';
import { Rgb } from '@hra-ui/design-system/color-picker';
import { render, RenderComponentOptions, screen } from '@testing-library/angular';
import { mockClear, mockDeep } from 'jest-mock-extended';
import { BehaviorSubject } from 'rxjs';
import embed, { Result } from 'vega-embed';
import { FileSaverService } from '../../services/file-saver/file-saver.service';
import { HistogramComponent } from './histogram.component';
import { CellTypeEntry } from '../../models/cell-type';

jest.mock('vega-embed', () => jest.fn());

describe('HistogramComponent', () => {
  const sampleData = [
    {
      edge: [],
      type: 'A',
      distance: 5,
    },
    {
      edge: [],
      type: 'B',
      distance: 7,
    },
  ];

  const sampleCellTypes: CellTypeEntry[] = [
    {
      name: 'test2',
      count: 9,
      outgoingEdgeCount: 7,
      color: [1, 2, 3],
    },
    {
      name: 'test1',
      count: 2,
      outgoingEdgeCount: 3,
      color: [4, 5, 6],
    },
  ];

  const embedResult = mockDeep<Result>();

  async function setup(options?: RenderComponentOptions<HistogramComponent>) {
    return render(HistogramComponent, {
      ...options,
      providers: [
        provideAssetHref('http://localhost/'),
        provideAnimations(),
        {
          provide: AnimationDriver,
          useClass: MockAnimationDriver,
        },
        ...(options?.providers ?? []),
      ],
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
        filteredCellTypes: sampleCellTypes,
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

  it('should download in the specified format', async () => {
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

    await fixture.componentInstance.download('svg');

    expect(fileSaveSpy).toHaveBeenCalledWith(imageUrl, 'cde-histogram.svg');
  });

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

    const priedInstance = instance as unknown as {
      pickedTotalCellTypeColor: WritableSignal<Rgb | undefined>;
      totalCellTypeColor: Signal<Rgb>;
    };
    priedInstance.pickedTotalCellTypeColor.set([1, 2, 3]);
    expect(priedInstance.totalCellTypeColor()).toEqual([1, 2, 3]);

    instance.resetAllCellsColor();
    // jsdom doesn't resolve theme tokens, so the theme's mark color is the on-surface fallback (#1a1c1e)
    expect(priedInstance.totalCellTypeColor()).toEqual([26, 28, 30]);
  });

  it('should update the theme colors in place when the color scheme changes', async () => {
    const prefersDark$ = new BehaviorSubject<BreakpointState>({ matches: false, breakpoints: {} });
    const { fixture } = await setup({
      inputs: {
        data: sampleData,
        colors: [],
        filteredCellTypes: sampleCellTypes,
      },
      providers: [{ provide: BreakpointObserver, useValue: { observe: () => prefersDark$ } }],
    });
    await fixture.whenStable();
    embedResult.view.signal.mockClear();
    jest.mocked(embed).mockClear();

    prefersDark$.next({ matches: true, breakpoints: {} });
    fixture.detectChanges();
    await fixture.whenStable();

    expect(embedResult.view.signal).toHaveBeenCalledWith('themeBackground', '#fcfbfd');
    expect(embedResult.view.signal).toHaveBeenCalledWith('themeMarkColor', '#1a1c1e');
    expect(embed).not.toHaveBeenCalled();
  });
});
