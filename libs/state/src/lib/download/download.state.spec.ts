import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { mock, mockFn, mockReset } from 'jest-mock-extended';
import { SVG_FORMAT } from './builtin-formats';
import { Svg } from './builtin-formats-ids';
import { AddEntry, ClearEntry, Download, RegisterFormat } from './download.action';
import { createDownloadFormatId, DownloadContext, DownloadEntry, DownloadFormat } from './download.model';
import { DownloadState } from './download.state';

describe('DownlodState', () => {
  const action = new Download(Svg);
  const ctx = mock<DownloadContext>();
  const anchor = mock<HTMLAnchorElement>();
  let controller: HttpTestingController;
  let state: DownloadState;
  const url = 'http://base.com/abcd.svg';

  function setEntry(entry: DownloadEntry): void {
    ctx.getState.mockReturnValue({
      formats: {
        [Svg]: SVG_FORMAT,
      },
      entries: {
        [Svg]: entry,
      },
    });
  }

  if (!URL.createObjectURL) {
    URL.createObjectURL = mockFn().mockReturnValue('blob:fakeblob');
    URL.revokeObjectURL = mockFn();
  }
  if (!window.fetch) {
    window.fetch = jest.fn();
  }

  beforeEach(() => {
    mockReset(ctx);
    jest.spyOn(document, 'createElement').mockReturnValue(anchor);
    jest.spyOn(document.body, 'appendChild').mockImplementation((node) => node);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DownloadState],
    });

    controller = TestBed.inject(HttpTestingController);
    state = TestBed.inject(DownloadState);
  });

  describe('download(ctx, action)', () => {
    it('should download data directly', () => {
      setEntry({ type: 'data', data: 'blob:fakeblob' });
      state.download(ctx, action);
    });

    it('should through error if does not contain entry', () => {
      ctx.getState.mockReturnValue({
        formats: {},
        entries: {},
      });
      expect(() => state.download(ctx, action)).toThrowError(new Error('Cannot download file without data'));
    });

    it('should guess empty extension if not format available', () => {
      ctx.getState.mockReturnValue({
        formats: {},
        entries: {
          [Svg]: { type: 'url', url: 'http://base.com/' },
        },
      });
      const pdfAction = new Download(Svg);
      state.download(ctx, pdfAction);
    });

    it('should use default name if unable to guessfilename', () => {
      setEntry({ type: 'url', url: 'http://base.com/' });
      state.download(ctx, action);
    });

    it('should download data from remote', () => {
      setEntry({ type: 'url', url: url });
      state.download(ctx, action);
      controller.match(url);
    });

    it('unable to download data from remote', () => {
      setEntry({ type: 'url', url: url });
      state.download(ctx, action);
      const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
      const data = 'Invalid request parameters';
      controller.expectOne(url).flush(data, mockErrorResponse); // TODO: FIX
    });
  });

  describe('registerFormat(ctx, action)', () => {
    it('register new download format', () => {
      const format: DownloadFormat = {
        id: createDownloadFormatId('svg'),
        label: 'SVG',
        extension: '.svg',
      };

      const formatPDF: DownloadFormat = {
        id: createDownloadFormatId('pdf'),
        label: 'PDF',
        extension: '.pdf',
      };
      jest.spyOn(ctx, 'setState').mockReturnValue({ formats: format, entries: {} });
      state.registerFormat(ctx, new RegisterFormat(formatPDF));
    });
  });

  describe('addEntry(ctx, action)', () => {
    it('add new file entry', () => {
      const entry: DownloadEntry = { data: '', type: 'data' };
      state.addEntry(ctx, new AddEntry(Svg, entry));
    });
  });

  describe('clearEntry(ctx, action)', () => {
    it('clear entry', () => {
      state.clearEntry(ctx, new ClearEntry(Svg));
    });
  });

  describe('ngxsOnInit(ctx)', () => {
    it('register new download format', () => {
      state.ngxsOnInit(ctx);
    });
  });
});
