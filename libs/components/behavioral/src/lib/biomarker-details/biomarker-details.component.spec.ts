import { MatTableModule } from '@angular/material/table';
import { HoverDirective } from '@hra-ui/cdk';
import { dispatch, selectQuerySnapshot, selectSnapshot } from '@hra-ui/cdk/injectors';
import { ResourceRegistrySelectors } from '@hra-ui/cdk/state';
import { ActiveFtuSelectors, TissueLibrarySelectors } from '@hra-ui/state';
import { calledWithFn } from 'jest-mock-extended';
import { Shallow } from 'shallow-render';
import { BiomarkerDetailsComponent } from './biomarker-details.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MarkdownModule } from 'ngx-markdown';

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

  const selectSnapshotSpy = calledWithFn<Any, Any[]>({ fallbackMockImplementation: () => () => [] });
  const selectQuerySnapshotSpy = calledWithFn<Any, Any[]>({ fallbackMockImplementation: () => () => [] });
  const iriSpy = jest.fn((): string | undefined => 'test');
  let shallow: Shallow<BiomarkerDetailsComponent>;

  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(selectSnapshot).mockImplementation(selectSnapshotSpy);
    jest.mocked(selectQuerySnapshot).mockImplementation(selectQuerySnapshotSpy);
    jest.mocked(dispatch).mockReturnValue(jest.fn());

    selectSnapshotSpy.calledWith(ActiveFtuSelectors.iri).mockReturnValue(iriSpy);
    selectSnapshotSpy.calledWith(TissueLibrarySelectors.tissues).mockReturnValue(() => TISSUES);
    selectQuerySnapshotSpy.calledWith(ResourceRegistrySelectors.anyText).mockReturnValue(() => '');

    shallow = new Shallow(BiomarkerDetailsComponent)
      .import(MarkdownModule.forRoot())
      .dontMock(MatTableModule, HoverDirective, MatDialogModule);
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

    describe('collaborate', () => {
      it('should open the contact modal dialog box', async () => {
        const { instance, inject } = await shallow.render();
        const spy = jest.spyOn(inject(MatDialog), 'open');
        instance.collaborate();
        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
