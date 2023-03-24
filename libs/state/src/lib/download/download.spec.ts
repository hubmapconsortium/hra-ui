import { StateContext } from '@ngxs/store';
import { mock, mockFn } from 'jest-mock-extended';
import { jsPDF } from 'jspdf';
import { DownloadState } from './download.state';
import { Download } from './download.action';
import { DownloadModel, FileFormat } from './download.model';

jest.mock('jspdf', () => ({ jsPDF: jest.fn() }));

describe('DownlodState', () => {
  const pngUrl = 'assests/test.png';
  const svgUrl = 'assests/test.svg';
  const fileName = 'downloadFile';
  const state = new DownloadState();

  if (!URL.createObjectURL) {
    URL.createObjectURL = mockFn().mockReturnValue('blob:fakeblob');
    URL.revokeObjectURL = mockFn();
  }

  afterEach(() => jest.clearAllMocks());
  afterEach(() => jest.restoreAllMocks());

  describe('blobDownload(data, filename)', () => {
    const data = new Blob(['hello world'], { type: 'text/plain' });
    const filename = 'test.txt';
    const anchor = mock<HTMLAnchorElement>();

    beforeEach(() => {
      jest.spyOn(document, 'createElement').mockReturnValue(anchor);
      jest.spyOn(document.body, 'appendChild').mockImplementation((node) => node);
    });

    it('should create an anchor element', () => {
      state.blobDownload(data, filename);
      expect(document.createElement).toHaveBeenCalledWith('a');
    });

    it('should append the anchor element to the body', () => {
      state.blobDownload(data, filename);
      expect(document.body.appendChild).toHaveBeenCalledWith(anchor);
    });

    it("should set the anchor's download attribute to the filename", () => {
      state.blobDownload(data, filename);
      expect(anchor.download).toEqual(filename);
    });

    it("should set the anchor's href to a data url", () => {
      state.blobDownload(data, filename);
      expect(anchor.href).toMatch(/^(blob|data):/);
    });

    it('should trigger a click on the anchor', () => {
      state.blobDownload(data, filename);
      expect(anchor.click).toHaveBeenCalled();
    });
  });

  describe('convertFileToPdf(filename, surl)', () => {
    const image = mock<HTMLImageElement>();
    const doc = mock<jsPDF>();
    const testCanvas = mock<HTMLCanvasElement>();

    beforeEach(() => {
      jest.mocked(jsPDF).mockReturnValue(doc);
      jest.spyOn(state, 'downloadImage').mockResolvedValue(image);
      jest.spyOn(state, 'createCanvas').mockResolvedValue(testCanvas);
      jest.spyOn(doc, 'addImage');
      jest.spyOn(doc, 'save');
    });

    it('should call create canvas', async () => {
      await state.convertFileToPdf(fileName, svgUrl);
      expect(state.createCanvas).toHaveBeenCalled();
    });

    it('should call addImage on doc object', async () => {
      await state.convertFileToPdf(fileName, svgUrl);
      expect(doc.addImage).toHaveBeenCalled();
    });

    it('should call save on doc object', async () => {
      await state.convertFileToPdf(fileName, svgUrl);
      expect(doc.save).toHaveBeenCalled();
    });
  });

  describe('convertFileToPng(filename, surl)', () => {
    const testCanvas = mock<HTMLCanvasElement>();
    const image = mock<HTMLImageElement>();

    beforeEach(() => {
      jest.spyOn(state, 'downloadImage').mockResolvedValue(image);
      jest.spyOn(state, 'createCanvas').mockResolvedValue(testCanvas);
      jest.spyOn(testCanvas, 'toBlob').mockImplementation((resolve) => resolve(null));
    });

    it('should call createCanvas', async () => {
      await state.convertFileToPng(fileName, svgUrl);
      expect(state.createCanvas).toHaveBeenCalled();
    });
  });

  describe('createCanvas(imageElement)', () => {
    const canvas = mock<HTMLCanvasElement>();
    const testImage = mock<HTMLImageElement>();
    const dCtx = mock<WebGL2RenderingContext>();

    testImage.width = 100;
    testImage.height = 100;

    beforeEach(() => {
      jest.spyOn(document, 'createElement').mockReturnValue(canvas);
      jest.spyOn(canvas, 'getContext').mockReturnValue(dCtx);
    });

    it('should call createCanvas', async () => {
      const testcanvas = await state.createCanvas(testImage);
      expect(testcanvas.width).toEqual(100);
    });

    it('should create canvas if ctx is undefined', async () => {
      jest.spyOn(canvas, 'getContext').mockReturnValue(null);
      const testcanvas = await state.createCanvas(testImage);
      expect(testcanvas.width).toEqual(100);
    });
  });

  describe('downloadFile(surl)', () => {
    const canvas = mock<HTMLCanvasElement>();
    const testImage = mock<HTMLImageElement>();
    const testCtx = mock<StateContext<DownloadModel>>();
    testImage.width = 100;
    testImage.height = 100;

    beforeEach(() => {
      jest.spyOn(document, 'createElement').mockReturnValue(canvas);
      jest.spyOn(state, 'convertFileToPng');
      jest.spyOn(state, 'convertFileToPdf');
      jest.spyOn(state, 'downloadAndSave');

      jest.spyOn(canvas, 'getContext');
    });

    it('should call createCanvas with PNG Format', async () => {
      const testActionPNG = new Download(FileFormat.PNG);
      state.downloadFile(testCtx, testActionPNG);
      expect(state.convertFileToPng).toHaveBeenCalled();
    });

    it('should call createCanvas with PDF format', async () => {
      const testActionPDF = new Download(FileFormat.PDF);
      state.downloadFile(testCtx, testActionPDF);
      expect(state.convertFileToPdf).toHaveBeenCalled();
    });

    it('should call createCanvas with action Format', async () => {
      const testActionPNG = new Download({ format: FileFormat.PNG, label: 'PNG' });
      state.downloadFile(testCtx, testActionPNG);
      expect(state.convertFileToPng).toHaveBeenCalled();
    });

    it('should call createCanvas with action Format', async () => {
      const testActionSVG = new Download(FileFormat.SVG);
      state.downloadFile(testCtx, testActionSVG);
      expect(state.downloadAndSave).toHaveBeenCalled();
    });
  });

  describe('downloadAndSave(fileUrl, fileName)', () => {
    const response = mock<Response>();
    const data = mock<Blob>();
    global.fetch = jest.fn(() => Promise.resolve(response)) as jest.Mock;

    beforeEach(() => {
      jest.spyOn(response, 'blob').mockResolvedValue(data);
      jest.spyOn(state, 'blobDownload').mockImplementation(() => undefined);
    });

    it('should call blobDownload', async () => {
      await state.downloadAndSave(fileName, svgUrl);
      expect(state.blobDownload).toHaveBeenCalled();
    });
  });

  describe('inferFilename(fileUrl)', () => {
    it('should return correct filename', async () => {
      expect(state.inferFilename(pngUrl)).toEqual('test');
    });
  });

  describe('inferFileExt(fileUrl)', () => {
    it('should return correct file ext.', async () => {
      expect(state.inferFileExtension(pngUrl)).toEqual('png');
    });
  });
});
