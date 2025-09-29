import { MatTableModule } from '@angular/material/table';
import { dispatch, selectQuerySnapshot, selectSnapshot } from '@hra-ui/cdk/injectors';
import { ResourceRegistrySelectors } from '@hra-ui/cdk/state';
import { FtuDataService } from '@hra-ui/services';
import { ActiveFtuSelectors, CellSummaryAggregate, IllustratorSelectors, TissueLibrarySelectors } from '@hra-ui/state';
import { calledWithFn, mock } from 'jest-mock-extended';
import { MarkdownModule } from 'ngx-markdown';
import { Shallow } from 'shallow-render';
import { BiomarkerDetailsComponent } from './biomarker-details.component';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;

jest.mock('@hra-ui/cdk/injectors');

describe('BiomarkerDetailsComponent', () => {
  const TISSUES = {
    test: {
      id: 'test',
      label: 'test',
    },
  };

  const MAPPING = [
    {
      label: '',
      id: '',
      groupId: '',
      ontologyId: 'id1',
    },
    {
      label: '',
      id: '',
      groupId: '',
      ontologyId: 'id2',
    },
  ];

  const selectSnapshotSpy = calledWithFn<Any, Any[]>({ fallbackMockImplementation: () => () => [] });
  const selectQuerySnapshotSpy = calledWithFn<Any, Any[]>({ fallbackMockImplementation: () => () => [] });
  const iriSpy = jest.fn((): string | undefined => 'test');
  const dataService = mock<FtuDataService>();
  let shallow: Shallow<BiomarkerDetailsComponent>;

  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(selectSnapshot).mockImplementation(selectSnapshotSpy);
    jest.mocked(selectQuerySnapshot).mockImplementation(selectQuerySnapshotSpy);
    jest.mocked(dispatch).mockReturnValue(jest.fn());

    selectSnapshotSpy.calledWith(ActiveFtuSelectors.iri).mockReturnValue(iriSpy);
    selectSnapshotSpy.calledWith(TissueLibrarySelectors.tissues).mockReturnValue(() => TISSUES);
    selectSnapshotSpy.calledWith(IllustratorSelectors.mapping).mockReturnValue(() => MAPPING);
    selectQuerySnapshotSpy.calledWith(ResourceRegistrySelectors.anyText).mockReturnValue(() => '');

    shallow = new Shallow(BiomarkerDetailsComponent)
      .import(MarkdownModule.forRoot())
      .dontMock(MatTableModule)
      .provideMock({ provide: FtuDataService, useValue: dataService });
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

  describe('illustrationIds', () => {
    it('should get illustration ids', async () => {
      const { instance } = await shallow.render();
      expect(instance.illustrationIds).toEqual(['id1', 'id2']);
    });
  });

  describe('trackByLabel(index, tab)', () => {
    it('returns the tab label', async () => {
      const { instance } = await shallow.render();
      const label = 'foobar';
      const value = instance.trackByLabel(0, { label } as CellSummaryAggregate);
      expect(value).toEqual(label);
    });
  });
});
