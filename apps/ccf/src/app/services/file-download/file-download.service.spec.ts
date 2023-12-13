import { FileDownloadService } from './file-download.service';
import { DeepMockProxy, MockProxy, mock, mockDeep } from 'jest-mock-extended';
import { ErrorHandler } from '@angular/core';

describe('FileDownloadService', () => {
  const url =
    'https://hubmapconsortium.github.io/ccf-releases/v1.3/2d-ftu/2d-ftu-kidney-ascending-thin-loop-of-henle.svg';
  const data = new Blob(['test data']);
  const objectUrl = 'object url for data';

  let service: FileDownloadService;
  let mockFetch: jest.Mock;
  let mockResponse: MockProxy<Response>;
  let mockCreateObjectUrl: jest.Mock;
  let mockRevokeObjectUrl: jest.Mock;
  let mockDocument: DeepMockProxy<Document>;
  let mockErrorHandler: MockProxy<ErrorHandler>;
  let mockElement: MockProxy<HTMLAnchorElement>;

  beforeEach(() => {
    mockFetch = jest.fn();
    mockResponse = mock();
    mockCreateObjectUrl = jest.fn();
    mockRevokeObjectUrl = jest.fn();
    mockDocument = mockDeep();
    mockErrorHandler = mock();
    mockElement = mock();

    mockFetch.mockResolvedValue(mockResponse);
    mockResponse.blob.mockResolvedValue(data);
    mockCreateObjectUrl.mockReturnValue(objectUrl);
    mockDocument.createElement.mockReturnValue(mockElement);

    global.fetch = mockFetch;
    URL.createObjectURL = mockCreateObjectUrl;
    URL.revokeObjectURL = mockRevokeObjectUrl;

    service = new FileDownloadService(mockDocument, mockErrorHandler);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('download', () => {
    it('should fetch data', async () => {
      const fetch = jest.spyOn(global, 'fetch');
      await service.download(url);

      expect(fetch).toHaveBeenCalledWith(url, {
        headers: new Headers({
          Origin: location.origin,
        }),
        mode: 'no-cors',
      });
    });

    it('should create a blob url', async () => {
      await service.download(url);
      expect(URL.createObjectURL).toHaveBeenCalled();
      expect(URL.revokeObjectURL).toHaveBeenCalledWith(objectUrl);
    });

    it('should download a file', async () => {
      const filename = 'sample.pdf';
      await service.download(url, filename);
      expect(mockElement.href).toBeDefined();
      expect(mockElement.download).toEqual(filename);
      expect(mockElement.click).toHaveBeenCalled();
    });

    it('should handle errors', async () => {
      const error = new Error('Download failed');
      mockFetch.mockRejectedValue(error);
      await service.download(url);
      expect(mockErrorHandler.handleError).toHaveBeenCalledWith(error);
    });
  });
});
