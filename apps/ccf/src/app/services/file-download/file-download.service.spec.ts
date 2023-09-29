import { FileDownloadService } from './file-download.service';
import { MockProxy, mock } from 'jest-mock-extended';
import { ErrorHandler } from '@angular/core';

describe('TableDataService', () => {
  let service: FileDownloadService;
  let errorHandler: MockProxy<ErrorHandler>;

  beforeEach(() => {
    service = new FileDownloadService(new Document, new ErrorHandler);
    errorHandler = mock()
    jest.spyOn(global, 'fetch').mockImplementation(
      jest.fn(
        () => Promise.resolve({ json: () => Promise.resolve({ origin }) })
      ) as jest.Mock
    );
  });

  describe('download()', () => {
    beforeEach(() => {

    })

    it('should download file', async () => {
      const mocked = mock(fetch)
    });
  });
});