import { StateContext } from '@ngxs/store';
import { mock, mockFn } from 'jest-mock-extended';
import { jsPDF } from 'jspdf';
import { DownloadState } from './download.state';
import { Download } from './download.action';
import { DownloadModel } from './download.model';

jest.mock('jspdf', () => ({ jsPDF: jest.fn() }));

describe('DownlodState', () => {
  const pngUrl = 'assests/test.png';
  const svgUrl = 'assests/test.svg';
  const fileName = 'downloadFile';
  const anchor = mock<HTMLAnchorElement>();
  const state = new DownloadState();

  if (!URL.createObjectURL) {
    URL.createObjectURL = mockFn().mockReturnValue('blob:fakeblob');
    URL.revokeObjectURL = mockFn();
  }
  if (!window.fetch) {
    window.fetch = jest.fn();
  }

  beforeEach(() => {
    jest.spyOn(document, 'createElement').mockReturnValue(anchor);
    jest.spyOn(document.body, 'appendChild').mockImplementation((node) => node);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  // describe('blobDownload(data, filename)', () => {
  //   const data = new Blob(['hello world'], { type: 'text/plain' });
  //   const filename = 'test.txt';

  //   it('should create an anchor element', () => {
  //     state.downloadData(data, filename);
  //     expect(document.createElement).toHaveBeenCalledWith('a');
  //   });

  //   it('should append the anchor element to the body', () => {
  //     state.downloadData(data, filename);
  //     expect(document.body.appendChild).toHaveBeenCalledWith(anchor);
  //   });

  //   it("should set the anchor's download attribute to the filename", () => {
  //     state.downloadData(data, filename);
  //     expect(anchor.download).toEqual(filename);
  //   });

  //   it("should set the anchor's href to a data url", () => {
  //     state.downloadData(data, filename);
  //     expect(anchor.href).toMatch(/^(blob|data):/);
  //   });

  //   it('should trigger a click on the anchor', () => {
  //     state.downloadData(data, filename);
  //     expect(anchor.click).toHaveBeenCalled();
  //   });
  // });

  describe('downloadFile(surl)', () => {
    const testImage = mock<HTMLImageElement>();
    const testCtx = mock<StateContext<DownloadModel>>();
    testImage.width = 100;
    testImage.height = 100;
  });

  describe('downloadRemoteData(fileUrl, fileName)', () => {
    const response = mock<Response>();
    const data = mock<Blob>();
  });

  describe('guessFilename(fileUrl)', () => {
    it('should return correct filename', async () => {
      // expect(state.guessFilename(pngUrl)).toEqual('test');
    });
  });
});
