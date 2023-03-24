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
  const state = new DownloadState();

  if (!URL.createObjectURL) {
    URL.createObjectURL = mockFn().mockReturnValue('blob:fakeblob');
    URL.revokeObjectURL = mockFn();
  }

  afterEach(() => jest.clearAllMocks());

  describe('blobDownload(data, filename)', () => {
    const data = new Blob(['hello world'], { type: 'text/plain' });
    const filename = 'test.txt';
    const anchor = mock<HTMLAnchorElement>();

    jest.spyOn(document, 'createElement').mockReturnValue(anchor);
    jest.spyOn(document.body, 'appendChild').mockImplementation((node) => node);

    afterAll(() => jest.restoreAllMocks());

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
    const doc = mock<jsPDF>();
    const testCanvas = mock<HTMLCanvasElement>();

    jest.spyOn(state, 'createCanvas').mockResolvedValue(testCanvas);
    jest.mocked(jsPDF).mockReturnValue(doc);
    jest.spyOn(doc, 'addImage');
    jest.spyOn(doc, 'save');

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
    jest.spyOn(state, 'downloadImage');
    jest.spyOn(state, 'createCanvas').mockResolvedValue(testCanvas);
    jest.spyOn(testCanvas, 'toBlob');

    it('should call createCanvas', async () => {
      await state.convertFileToPng(fileName, svgUrl);
      expect(state.createCanvas).toHaveBeenCalled();
    });
  });

  describe('createCanvas(imageElement)', () => {
    const canvas = mock<HTMLCanvasElement>();
    const testImage = mock<HTMLImageElement>();
    testImage.width = 100;
    testImage.height = 100;

    jest.spyOn(document, 'createElement').mockReturnValue(canvas);
    jest.spyOn(canvas, 'getContext');

    it('should call createCanvas', async () => {
      const testcanvas = await state.createCanvas(testImage);
      expect(testcanvas.width).toEqual(100);
    });
  });

  describe('downloadFile(surl)', () => {
    const canvas = mock<HTMLCanvasElement>();
    const testImage = mock<HTMLImageElement>();
    const testCtx = mock<StateContext<DownloadModel>>();
    const testAction = mock<Download>();
    testImage.width = 100;
    testImage.height = 100;

    jest.spyOn(document, 'createElement').mockReturnValue(canvas);
    jest.spyOn(canvas, 'getContext');

    it('should call createCanvas', async () => {
      return state.downloadFile(testCtx, testAction);
    });
  });

  describe('downloadAndSave(fileUrl, fileName)', () => {
    const response = mock<Response>();
    const data = mock<Blob>();
    global.fetch = jest.fn(() => Promise.resolve(response)) as jest.Mock;

    jest.spyOn(response, 'blob').mockResolvedValue(data);
    jest.spyOn(state, 'blobDownload');

    it('should call blobDownload', async () => {
      await state.downloadAndSave(fileName, svgUrl);
      expect(await state.blobDownload).toHaveBeenCalled();
    });
  });

  it('should call inferFilename and return file name.', async () => {
    expect(state.inferFilename(pngUrl)).toEqual('test');
  });

  it('should call inferFileExtension and return file name.', async () => {
    expect(state.inferFileExtension(pngUrl)).toEqual('png');
  });
});
