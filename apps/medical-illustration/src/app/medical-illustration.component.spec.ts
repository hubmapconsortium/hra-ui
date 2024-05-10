import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ErrorHandler, SimpleChange } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Shallow } from 'shallow-render';
import { MedicalIllustrationComponent } from './medical-illustration.component';
import { CellEntry, Illustration, IllustrationFile, IllustrationsJsonld } from './medical-illustration.models';

const SAMPLE_FILE: IllustrationFile = {
  file: 'test.svg',
  file_format: 'image/svg+xml',
};

const SAMPLE_CELL: CellEntry = {
  label: 'cell1',
  svg_id: 'cell1-path',
  svg_group_id: 'cell1-group',
  representation_of: 'tissue',
};

const SAMPLE_ILLUSTRATION_1: Illustration = {
  '@id': 'test1',
  mapping: [SAMPLE_CELL],
  illustration_files: [SAMPLE_FILE],
};

const SAMPLE_ILLUSTRATION_2: Illustration = {
  '@id': 'test2',
  mapping: [],
  illustration_files: [],
};

const SAMPLE_ILLUSTRATIONS: IllustrationsJsonld = {
  '@graph': [SAMPLE_ILLUSTRATION_1, SAMPLE_ILLUSTRATION_2],
};

describe('MedicalIllustrationComponent', () => {
  let shallow: Shallow<MedicalIllustrationComponent>;

  beforeEach(() => {
    shallow = new Shallow(MedicalIllustrationComponent)
      .import(HttpClientTestingModule)
      .dontMock(HttpClientTestingModule);
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

    it('accepts an id when illustrations is set', async () => {
      const { instance } = await shallow.render({
        bind: {
          selectedIllustration: SAMPLE_ILLUSTRATION_1['@id'],
          illustrations: SAMPLE_ILLUSTRATIONS,
        },
      });
      const url = await firstValueFrom(instance.url$);
      expect(url).toEqual(SAMPLE_FILE.file);
    });

    it('accepts an id when remoteApiEndpoint is set', async () => {
      const endpoint = 'https://www.example.com';
      const { instance, inject } = await shallow.render({
        bind: {
          selectedIllustration: SAMPLE_ILLUSTRATION_1['@id'],
          remoteApiEndpoint: endpoint,
        },
      });
      const controller = inject(HttpTestingController);
      const request = controller.expectOne(endpoint);
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

    it('errors if it is an id and neither illustrations nor remoteApiEndpoint are set', async () => {
      const handleError = jest.fn();
      const { instance } = await shallow
        .mock(ErrorHandler, {
          handleError,
        })
        .render({
          bind: {
            selectedIllustration: SAMPLE_ILLUSTRATION_1['@id'],
          },
        });

      const url = await firstValueFrom(instance.url$);
      expect(url).toBeUndefined();
      expect(handleError).toHaveBeenCalledTimes(1);
    });
  });

  describe('.remoteApiEndpoint', () => {
    it('caches responses', async () => {
      const endpoint = 'https://www.example.com';
      const { instance, inject } = await shallow.render({
        bind: {
          selectedIllustration: SAMPLE_ILLUSTRATION_1['@id'],
          remoteApiEndpoint: endpoint,
        },
      });
      const controller = inject(HttpTestingController);
      const request = controller.expectOne(endpoint);
      request.flush(SAMPLE_ILLUSTRATIONS);

      const selectedIllustration = SAMPLE_ILLUSTRATION_2['@id'];
      instance.selectedIllustration = selectedIllustration;
      instance.ngOnChanges({
        selectedIllustration: new SimpleChange('', selectedIllustration, false),
      });

      const url = await firstValueFrom(instance.url$);
      expect(url).toBeUndefined();
      controller.verify();
    });
  });

  describe('.highlight', () => {
    it('can be set to a cell object', async () => {
      const { instance } = await shallow.render({ bind: { highlight: SAMPLE_CELL } });
      expect(instance.highlightId).toEqual(SAMPLE_CELL.representation_of);
    });
  });
});
