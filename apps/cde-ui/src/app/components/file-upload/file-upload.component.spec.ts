import { FileLoaderOptions, FileLoaderResult, FileUploadComponent } from './file-upload.component';
import { render, screen } from '@testing-library/angular';
import '@testing-library/jest-dom';
import { signal } from '@angular/core';

describe('FileUploadComponent', () => {
  let loader: jest.Mock<FileLoaderResult<unknown>, [File, FileLoaderOptions]>;

  beforeEach(() => {
    loader = jest.fn();
    loader.mockReturnValue({
      progress: signal(0),
      result: Promise.resolve('abc'),
    });
  });

  test('should load', async () => {
    await render(FileUploadComponent, {
      componentInputs: {
        fileTitle: 'testTitle',
        accept: 'csv',
        loader: loader,
      },
    });

    expect(screen.getByText(/testTitle/i)).toBeInTheDocument();
  });
});
