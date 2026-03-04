import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { mock, mockFn } from 'jest-mock-extended';
import { lastValueFrom, of } from 'rxjs';
import { SVG_FORMAT } from './builtin-formats';
import { Svg } from './builtin-formats-ids';
import { AddEntry, Download, DownloadCsv, DownloadSummaries, Load, RegisterFormat } from './download.action';
import {
  DownloadContext,
  DownloadEntry,
  DownloadFormat,
  DownloadModel,
  createDownloadFormatId,
} from './download.model';
import { DownloadState } from './download.state';
import { FtuDataService, Iri } from '@hra-ui/services';
import { SnackbarService } from '@hra-ui/design-system/snackbar';

describe('DownloadState', () => {
  const urlFull = 'http://base.com/abcd.svg';
  const urlNoExtension = 'http://base.com/abcd';
  const urlNoPath = 'http://base.com/';
  const emptyBlob = new Blob();
  const action = new Download(Svg);
  const ctx = mock<DownloadContext>();
  const anchor = mock<HTMLAnchorElement>();
  const snackbar = mock<SnackbarService>();
  let controller: HttpTestingController;
  let state: DownloadState;
  let latest: DownloadModel;

  function setEntry(entry: DownloadEntry): void {
    latest = {
      formats: {
        [Svg]: SVG_FORMAT,
      },
      entries: {
        [Svg]: entry,
      },
    };
  }

  async function doRemoteDownload(url: string, data = emptyBlob): Promise<TestRequest> {
    const res = state.download(ctx, action);
    const p = res ? lastValueFrom(res) : undefined;
    const match = controller.expectOne(url);
    match.flush(data);
    await p;
    return match;
  }

  beforeAll(() => {
    if (!URL.createObjectURL) {
      URL.createObjectURL = mockFn().mockReturnValue('blob:fakeblob');
      URL.revokeObjectURL = mockFn();
    }

    jest.spyOn(document, 'createElement').mockReturnValue(anchor);
    jest.spyOn(document.body, 'appendChild').mockImplementation((node) => node);
  });

  beforeEach(() => {
    jest.clearAllMocks();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DownloadState, FtuDataService, { provide: SnackbarService, useValue: snackbar }],
    });

    ctx.getState.mockImplementation(() => latest);
    ctx.setState.mockImplementation((val) => {
      latest = typeof val === 'function' ? val(latest) : val;
      return latest;
    });

    latest = { formats: {}, entries: {} };
    controller = TestBed.inject(HttpTestingController);
    state = TestBed.inject(DownloadState);
  });

  afterAll(() => jest.restoreAllMocks());

  describe('download(ctx, action)', () => {
    it('should download data directly', async () => {
      setEntry({ type: 'data', data: 'blob:fakeblob' });
      await state.download(ctx, action);
      expect(anchor.click).toHaveBeenCalled();
    });

    it('should through error if does not contain entry', () => {
      const error = new Error('Cannot download file without data');
      expect(() => state.download(ctx, action)).toThrow(error);
    });

    it('should guess empty extension if not format available', async () => {
      ctx.getState.mockReturnValue({
        formats: {},
        entries: {
          [Svg]: { type: 'url', url: urlNoExtension },
        },
      });
      await doRemoteDownload(urlNoExtension);
      expect(anchor.download).toEqual('abcd');
    });

    it('should use default name if unable to guessfilename', async () => {
      setEntry({ type: 'url', url: urlNoPath });
      await doRemoteDownload(urlNoPath);
      expect(anchor.download).toEqual('download.svg');
    });

    it('should download data from remote', async () => {
      setEntry({ type: 'url', url: urlFull });
      await doRemoteDownload(urlFull);
    });

    it('unable to download data from remote', async () => {
      setEntry({ type: 'url', url: urlFull });
      const res = state.download(ctx, action);
      const p = res ? lastValueFrom(res) : undefined;
      const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
      controller.expectOne(urlFull).flush(emptyBlob, mockErrorResponse);
      expect(p).rejects.toBeDefined();
    });
  });

  describe('registerFormat(ctx, action)', () => {
    const customFormat: DownloadFormat = {
      id: createDownloadFormatId('custom'),
      label: 'Test',
      extension: '.test',
    };

    it('register new download format', () => {
      state.registerFormat(ctx, new RegisterFormat(customFormat));
      expect(latest.formats).toEqual({ [customFormat.id]: customFormat });
    });
  });

  describe('load(ctx, action)', () => {
    it('loads and maps data file references into state entries', async () => {
      const getDataFileReferences = jest.fn().mockReturnValue(
        of([
          { format: 'svg', url: 'http://base.com/file.svg' },
          { format: 'json', url: 'http://base.com/file.json' },
        ]),
      );
      (state as unknown as { dataService: { getDataFileReferences: typeof getDataFileReferences } }).dataService = {
        getDataFileReferences,
      };

      await lastValueFrom(state.load(ctx, new Load('iri:test' as never)));

      expect(getDataFileReferences).toHaveBeenCalledWith('iri:test');

      expect(latest.entries).toEqual({
        [createDownloadFormatId('svg')]: { type: 'url', url: 'http://base.com/file.svg' },
        [createDownloadFormatId('json')]: { type: 'url', url: 'http://base.com/file.json' },
      });
    });
  });

  describe('downloadSummaries(ctx, action)', () => {
    it('downloads summaries as a json file', async () => {
      const downloadDataSpy = jest
        .spyOn(state as unknown as { downloadData: (blob: Blob, filename: string) => Promise<void> }, 'downloadData')
        .mockResolvedValue(undefined);

      const summaries = [
        {
          biomarker_type: 'gene',
          cell_source: 'source-1' as Iri,
          summary: [
            {
              cell_id: 'cell-1' as Iri,
              cell_label: 'Cell 1',
              count: 10,
              percentage: 1,
              genes: [
                {
                  gene_id: 'gene-1',
                  gene_label: 'Gene 1',
                  ensemble_id: 'ens-1',
                  mean_expression: 0.5,
                },
              ],
            },
          ],
        },
      ];

      state.downloadSummaries(ctx, new DownloadSummaries(summaries));

      expect(downloadDataSpy).toHaveBeenCalledTimes(1);
      const [blob, filename] = downloadDataSpy.mock.calls[0];
      expect(filename).toBe('cell-summaries.json');
      expect(blob).toBeDefined();
      expect((blob as Blob).size).toBeGreaterThan(0);
    });
  });

  describe('downloadCsv(ctx, action)', () => {
    it('downloads source references as csv with escaped values', async () => {
      const downloadDataSpy = jest
        .spyOn(state as unknown as { downloadData: (blob: Blob, filename: string) => Promise<void> }, 'downloadData')
        .mockResolvedValue(undefined);

      const csvId = createDownloadFormatId('csv');
      latest = {
        formats: {
          [csvId]: {
            id: csvId,
            label: 'CSV',
            extension: '.csv',
          },
        },
        entries: {},
      };

      const sourceRefs = [
        {
          title: 'A "quoted" title',
          doi: '10.1000/test',
          year: 2026,
          datasetTitle: 'Dataset 1',
          datasetId: 'dataset-1',
          cellType: 'CT',
          healthStatus: 'healthy',
          sex: 'F',
          age: 30,
          bmi: 21,
          ethnicity: 'test',
        },
      ];

      state.downloadCsv(ctx, new DownloadCsv(sourceRefs, 'http://base.com/source-refs' as Iri));

      expect(downloadDataSpy).toHaveBeenCalledTimes(1);
      const [blob, filename] = downloadDataSpy.mock.calls[0];
      expect(filename).toBe('source-refs.csv');
      expect(blob).toBeDefined();
      expect((blob as Blob).size).toBeGreaterThan(0);
    });
  });

  describe('downloadData(blob, filename)', () => {
    it('falls back to anchor download when file picker is unsupported', async () => {
      (window as Window & { showSaveFilePicker?: unknown }).showSaveFilePicker = undefined;

      await (
        state as unknown as {
          downloadData: (blob: Blob, filename: string) => Promise<void>;
        }
      ).downloadData(new Blob(['x']), 'file.txt');

      expect(anchor.click).toHaveBeenCalled();
      expect(snackbar.open).toHaveBeenCalledWith('File downloaded', '', false, 'start', { duration: 5000 });
    });

    it('uses file picker when available and shows snackbar on success', async () => {
      const write = jest.fn().mockResolvedValue(undefined);
      const close = jest.fn().mockResolvedValue(undefined);
      const createWritable = jest.fn().mockResolvedValue({ write, close });
      const showSaveFilePicker = jest.fn().mockResolvedValue({ createWritable });
      (window as Window & { showSaveFilePicker?: typeof showSaveFilePicker }).showSaveFilePicker = showSaveFilePicker;

      const blob = new Blob(['picker']);
      await (
        state as unknown as {
          downloadData: (inputBlob: Blob, filename: string) => Promise<void>;
        }
      ).downloadData(blob, 'picked.txt');

      expect(showSaveFilePicker).toHaveBeenCalledWith({ suggestedName: 'picked.txt' });
      expect(write).toHaveBeenCalledWith(blob);
      expect(close).toHaveBeenCalled();
      expect(anchor.click).not.toHaveBeenCalled();
      expect(snackbar.open).toHaveBeenCalledWith('File downloaded', '', false, 'start', { duration: 5000 });
    });

    it('does not fallback when file picker is canceled', async () => {
      const showSaveFilePicker = jest.fn().mockRejectedValue(new DOMException('Aborted', 'AbortError'));
      (window as Window & { showSaveFilePicker?: typeof showSaveFilePicker }).showSaveFilePicker = showSaveFilePicker;

      await (
        state as unknown as {
          downloadData: (blob: Blob, filename: string) => Promise<void>;
        }
      ).downloadData(new Blob(['picker-cancel']), 'cancel.txt');

      expect(anchor.click).not.toHaveBeenCalled();
      expect(snackbar.open).not.toHaveBeenCalled();
    });

    it('falls back to anchor when file picker throws non-abort error', async () => {
      const showSaveFilePicker = jest.fn().mockRejectedValue(new Error('picker failed'));
      (window as Window & { showSaveFilePicker?: typeof showSaveFilePicker }).showSaveFilePicker = showSaveFilePicker;

      await (
        state as unknown as {
          downloadData: (blob: Blob, filename: string) => Promise<void>;
        }
      ).downloadData(new Blob(['picker-error']), 'fallback.txt');

      expect(anchor.click).toHaveBeenCalled();
      expect(snackbar.open).toHaveBeenCalledWith('File downloaded', '', false, 'start', { duration: 5000 });
    });
  });

  describe('addEntry(ctx, action)', () => {
    it('add new file entry', () => {
      const entry: DownloadEntry = { data: '', type: 'data' };
      state.addEntry(ctx, new AddEntry(Svg, entry));
      expect(latest.entries).toEqual({ [Svg]: entry });
    });
  });

  describe('clearEntries(ctx, action)', () => {
    it('clear entry', () => {
      state.clearEntries(ctx);
      expect(latest.entries).toEqual({});
    });
  });

  describe('ngxsOnInit(ctx)', () => {
    it('register default download format', () => {
      state.ngxsOnInit(ctx);
      expect(ctx.dispatch).toHaveBeenCalled();
    });
  });
});
