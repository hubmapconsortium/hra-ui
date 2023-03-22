import { mock, mockFn } from 'jest-mock-extended';
import { jsPDF } from 'jspdf';
import { Download } from './download.action';
import { DownloadState } from './download.state';

jest.mock('jspdf');

describe('DownlodState', () => {
  const testFileFormat = 'svg';
  const svgUrl = 'assests/test.svg';
  const pdfUrl = 'assests/test.pdf';
  const pngUrl = 'assests/test.png';

  const testAction = new Download(testFileFormat);
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

  describe('convertFileToPdf', () => {
    const doc = mock<jsPDF>();

    jest.mocked(jsPDF).mockReturnValue(doc);
  });

  it('should convert file to pdf from svg', async () => {
    const fileName = 'testFile';
    const surl = 'http://example.com/image.jpg';
    const canvasDataURL = 'data:image/jpeg;base64,/9j/4AAQSk...'; // example data URL
    const downloadImageMock = jest.fn().mockResolvedValue(canvasDataURL);
    const createCanvasMock = jest.fn().mockResolvedValue({
      toDataURL: jest.fn().mockReturnValue(canvasDataURL),
      width: 500,
      height: 500,
    });
    const saveMock = jest.fn();
    const jsPDFMock = {
      addImage: jest.fn(),
      save: saveMock,
    };
    const importMock = jest.fn().mockResolvedValue({ jsPDF: jsPDFMock });

    state.downloadImage = downloadImageMock;
    state.createCanvas = createCanvasMock;

    await state.convertFileToPdf(fileName, surl);

    expect(downloadImageMock).toHaveBeenCalledWith(surl);
    expect(createCanvasMock).toHaveBeenCalledWith(canvasDataURL);
    expect(jsPDFMock.addImage).toHaveBeenCalledWith(canvasDataURL, 0, 0, 500, 500);
    expect(saveMock).toHaveBeenCalledWith(`${fileName}.pdf`);
  });

  it('should call inferFilename and return file name.', async () => {
    expect(state.inferFilename(pngUrl)).toEqual('test');
  });

  it('should call inferFileExtension and return file name.', async () => {
    expect(state.inferFileExtension(pngUrl)).toEqual('png');
  });
});
