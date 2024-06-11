import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {
  FTU_DATA_IMPL_ENDPOINTS,
  Iri,
  RawCellEntry,
  RawIllustration,
  RawIllustrationFile,
  RawIllustrationsJsonld,
} from '@hra-ui/services';
import { ReplaySubject, firstValueFrom } from 'rxjs';
import { Shallow } from 'shallow-render';
import { MedicalIllustrationComponent } from './medical-illustration.component';

const SAMPLE_FILE: RawIllustrationFile = {
  file: 'test.svg',
  file_format: 'image/svg+xml',
};

const SAMPLE_CELL: RawCellEntry = {
  label: 'cell1',
  svg_id: 'cell1-path',
  svg_group_id: 'cell1-group',
  representation_of: 'tissue',
};

const SAMPLE_ILLUSTRATION_1: RawIllustration = {
  '@id': 'https://example.com?id=1' as Iri,
  label: '',
  organ_id: '',
  organ_label: '',
  representation_of: '',
  mapping: [SAMPLE_CELL],
  illustration_files: [SAMPLE_FILE],
};

const SAMPLE_ILLUSTRATION_2: RawIllustration = {
  '@id': 'https://example.com?id=2' as Iri,
  label: '',
  organ_id: '',
  organ_label: '',
  representation_of: '',
  mapping: [],
  illustration_files: [],
};

const SAMPLE_ILLUSTRATIONS: RawIllustrationsJsonld = {
  '@graph': [SAMPLE_ILLUSTRATION_1, SAMPLE_ILLUSTRATION_2],
};

describe('MedicalIllustrationComponent', () => {
  let shallow: Shallow<MedicalIllustrationComponent>;

  beforeEach(() => {
    shallow = new Shallow(MedicalIllustrationComponent)
      .import(HttpClientTestingModule)
      .dontMock(HttpClientTestingModule, FTU_DATA_IMPL_ENDPOINTS)
      .provide({
        provide: FTU_DATA_IMPL_ENDPOINTS,
        useValue: new ReplaySubject(1),
      });
  });

  it('creates', async () => {
    await expect(shallow.render()).resolves.toBeDefined();
  });

  describe('.selectedIllustration', () => {
    it('accepts an illustration object', async () => {
      const { instance } = await shallow.render({ bind: { selectedIllustration: SAMPLE_ILLUSTRATION_1 } });
      const url = await firstValueFrom(instance.url$);
      expect(url).toEqual(SAMPLE_FILE.file);
    });

    it('accepts an id when illustrations is set to an object', async () => {
      const { instance } = await shallow.render({
        bind: {
          selectedIllustration: SAMPLE_ILLUSTRATION_1['@id'],
          illustrations: SAMPLE_ILLUSTRATIONS,
        },
      });
      const url = await firstValueFrom(instance.url$);
      expect(url).toEqual(SAMPLE_FILE.file);
    });

    it('accepts an id when illustrations is set to an url', async () => {
      const endpoint = 'https://www.example.com';
      const { instance, inject } = await shallow.render({
        bind: {
          selectedIllustration: SAMPLE_ILLUSTRATION_1['@id'],
          illustrations: endpoint,
        },
      });
      const controller = inject(HttpTestingController);
      const request = controller.expectOne((req) => req.url.startsWith(endpoint));
      request.flush(SAMPLE_ILLUSTRATIONS);

      const url = await firstValueFrom(instance.url$);
      expect(url).toEqual(SAMPLE_FILE.file);
      controller.verify();
    });

    it('accepts an empty id', async () => {
      const { instance } = await shallow.render({ bind: { selectedIllustration: '' } });
      const url = await firstValueFrom(instance.url$);
      expect(url).toBeUndefined();
    });
  });

  describe('.highlight', () => {
    it('can be set to a cell object', async () => {
      const { instance } = await shallow.render({ bind: { highlight: SAMPLE_CELL } });
      expect(instance.highlightId).toEqual(SAMPLE_CELL.representation_of);
    });
  });
});
