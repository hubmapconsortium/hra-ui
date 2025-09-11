import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { dispatch, selectQuerySnapshot, selectSnapshot } from '@hra-ui/cdk/injectors';
import { ResourceRegistrySelectors } from '@hra-ui/cdk/state';
import {
  ActiveFtuSelectors,
  TissueLibrarySelectors,
  CellSummarySelectors,
  IllustratorSelectors,
  IllustratorActions,
} from '@hra-ui/state';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { calledWithFn, mock } from 'jest-mock-extended';
import { Shallow } from 'shallow-render';

import { BiomarkerDetailsWcComponent } from './biomarker-details-wc.component';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;

jest.mock('@hra-ui/cdk/injectors');

describe('BiomarkerDetailsWcComponent', () => {
  const TISSUES = {
    test: {
      id: 'test',
      label: 'test',
    },
  };

  const MOCK_TABS = [
    { label: 'Tab 1', columns: [], rows: [] },
    { label: 'Tab 2', columns: [], rows: [{ data: 'test' }] },
  ];

  const MOCK_MAPPING = [{ ontologyId: 'id1' }, { ontologyId: 'id2' }, { ontologyId: 'id1' }];

  const selectSnapshotSpy = calledWithFn<Any, Any[]>({ fallbackMockImplementation: () => () => [] });
  const selectQuerySnapshotSpy = calledWithFn<Any, Any[]>({ fallbackMockImplementation: () => () => [] });
  const iriSpy = jest.fn((): string | undefined => 'test');
  const getTabsSpy = jest.fn(() => MOCK_TABS);
  const mappingSpy = jest.fn(() => MOCK_MAPPING);
  const dialog = mock<MatDialog>();
  const ga = mock<GoogleAnalyticsService>();
  const highlightCellSpy = jest.fn();
  let shallow: Shallow<BiomarkerDetailsWcComponent>;
  beforeEach(() => {
    jest.clearAllMocks();

    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockResolvedValue(undefined),
      },
    });

    jest.mocked(selectSnapshot).mockImplementation(selectSnapshotSpy);
    jest.mocked(selectQuerySnapshot).mockImplementation(selectQuerySnapshotSpy);
    jest.mocked(dispatch).mockImplementation((action) => {
      if (action === IllustratorActions.HighlightCellType) {
        return highlightCellSpy;
      }
      return jest.fn();
    });
    selectSnapshotSpy.calledWith(ActiveFtuSelectors.iri).mockReturnValue(iriSpy);
    selectSnapshotSpy.calledWith(TissueLibrarySelectors.tissues).mockReturnValue(() => TISSUES);
    selectSnapshotSpy.calledWith(CellSummarySelectors.aggregates).mockReturnValue(getTabsSpy);
    selectSnapshotSpy.calledWith(IllustratorSelectors.mapping).mockReturnValue(mappingSpy);
    selectQuerySnapshotSpy.calledWith(ResourceRegistrySelectors.anyText).mockReturnValue(() => '');

    shallow = new Shallow(BiomarkerDetailsWcComponent)
      .dontMock(MatTableModule, MatDialogModule)
      .provideMock({
        provide: MatDialog,
        useValue: dialog,
      })
      .provideMock({
        provide: GoogleAnalyticsService,
        useValue: ga,
      });
  });

  it('should create', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });

  it('should toggleFullscreen', async () => {
    const { instance } = await shallow.render();
    instance.isTableFullScreen = false;
    instance.toggleFullscreen();
    expect(instance.isTableFullScreen).toBeTruthy();
  });

  it('should change tabs', async () => {
    const { instance } = await shallow.render();
    const mockEvent = {
      tab: {
        textLabel: 'label',
      },
    } as MatTabChangeEvent;

    const mockEvent2 = {
      tab: null,
    } as unknown as MatTabChangeEvent;

    const spy = jest.spyOn(instance, 'logTabChange');
    instance.logTabChange(mockEvent);
    instance.logTabChange(mockEvent2);
    expect(spy).toHaveBeenCalled();
  });

  describe('.tissueInfo', () => {
    it('should get tissueInfo', async () => {
      const { instance } = await shallow.render();

      expect(instance.tissueInfo).toEqual({
        id: TISSUES['test'].id,
        label: TISSUES['test'].label,
      });
    });

    it('should return empty tissue info if iri is undefined', async () => {
      const { instance } = await shallow.render();
      iriSpy.mockReturnValue(undefined);

      expect(instance.tissueInfo).toEqual({
        id: '',
        label: '',
      });
    });
  });

  describe('trackByIndex', () => {
    it('returns the index', async () => {
      const { instance } = await shallow.render();
      instance.trackByIndex(1);
      expect(instance.trackByIndex(1)).toEqual(1);
    });
  });

  describe('copyEmailToClipboard', () => {
    it('should copy email to clipboard and track analytics', async () => {
      const { instance } = await shallow.render();
      const clipboardSpy = jest.spyOn(navigator.clipboard, 'writeText');

      await (instance as any).copyEmailToClipboard();

      expect(clipboardSpy).toHaveBeenCalledWith('infoccf@iu.edu');
      expect(ga.event).toHaveBeenCalledWith('email_copied', 'clipboard');
    });
  });

  describe('tissueTitle', () => {
    it('should return tissue label when iri exists', async () => {
      iriSpy.mockReturnValue('test');
      const { instance } = await shallow.render();

      expect(instance.tissueTitle).toBe('test');
    });

    it('should return empty string when iri is undefined', async () => {
      const { instance } = await shallow.render();
      iriSpy.mockReturnValue(undefined);

      expect(instance.tissueTitle).toBe('');
    });
  });

  describe('tabs', () => {
    it('should return tabs from getTabs', async () => {
      const { instance } = await shallow.render();

      expect(instance.tabs).toEqual(MOCK_TABS);
    });
  });

  describe('illustrationIds', () => {
    it('should return unique ontology ids from mapping', async () => {
      const { instance } = await shallow.render();

      expect(instance.illustrationIds).toEqual(['id1', 'id2']);
    });
  });

  describe('highlightCells', () => {
    it('should call highlightCell with provided label', async () => {
      const { instance } = await shallow.render();

      instance.highlightCells('test-label');

      expect(highlightCellSpy).toHaveBeenCalledWith('test-label');
    });

    it('should call highlightCell with undefined when no label provided', async () => {
      const { instance } = await shallow.render();

      instance.highlightCells();

      expect(highlightCellSpy).toHaveBeenCalledWith(undefined);
    });
  });

  describe('onToggleChange', () => {
    it('should set activeTabIndex when valid value is provided', async () => {
      const { instance } = await shallow.render();

      instance.onToggleChange('proteins');

      expect((instance as any).activeTabIndex).toBe(1);
    });

    it('should not change activeTabIndex when invalid value is provided', async () => {
      const { instance } = await shallow.render();
      const initialIndex = (instance as any).activeTabIndex;

      instance.onToggleChange('invalid-value');

      expect((instance as any).activeTabIndex).toBe(initialIndex);
    });
  });
});
