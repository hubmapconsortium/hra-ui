import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { mock, mockFn } from 'jest-mock-extended';
import { lastValueFrom } from 'rxjs';
import { SVG_FORMAT } from './builtin-formats';
import { Svg } from './builtin-formats-ids';
import { AddEntry, Download, RegisterFormat } from './download.action';
import {
  DownloadContext,
  DownloadEntry,
  DownloadFormat,
  DownloadModel,
  createDownloadFormatId,
} from './download.model';
import { DownloadState } from './download.state';

describe('DownlodState', () => {
  const url = 'http://base.com/abcd.svg';
  const urlNoExtension = 'http://base.com/abcd';
  const urlNoPath = 'http://base.com/';
  const emptyBlob = new Blob();
  const action = new Download(Svg);
  const ctx = mock<DownloadContext>();
  const anchor = mock<HTMLAnchorElement>();
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

    ctx.getState.mockImplementation(() => latest);
    ctx.setState.mockImplementation((val) => {
      latest = typeof val === 'function' ? val(latest) : val;
      return latest;
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DownloadState],
    });

    latest = { formats: {}, entries: {} };
    controller = TestBed.inject(HttpTestingController);
    state = TestBed.inject(DownloadState);
  });

  afterAll(() => jest.restoreAllMocks());

  describe('download(ctx, action)', () => {
    it('should download data directly', () => {
      setEntry({ type: 'data', data: 'blob:fakeblob' });
      state.download(ctx, action);
      expect(anchor.click).toHaveBeenCalled();
    });

    it('should through error if does not contain entry', () => {
      const error = new Error('Cannot download file without data');
      expect(() => state.download(ctx, action)).toThrowError(error);
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
      setEntry({ type: 'url', url });
      await doRemoteDownload(url);
    });

    it('unable to download data from remote', async () => {
      setEntry({ type: 'url', url });
      const res = state.download(ctx, action);
      const p = res ? lastValueFrom(res) : undefined;
      //
      const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
      const data = 'Invalid request parameters';
      controller.expectOne(url).flush(data, mockErrorResponse); // TODO: FIX

      expect(p).rejects.toBeDefined(); //
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

  describe('addEntry(ctx, action)', () => {
    it('add new file entry', () => {
      const entry: DownloadEntry = { data: '', type: 'data' };
      state.addEntry(ctx, new AddEntry(Svg, entry));
      expect(latest.entries).toEqual({ [Svg]: entry });
    });
  });

  describe('clearEntries(ctx, action)', () => {
    it('clear entry', () => {
      state.clearEntry(ctx);
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
