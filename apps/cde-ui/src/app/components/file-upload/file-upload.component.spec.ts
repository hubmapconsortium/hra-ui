import { Injector, OutputEmitterRef, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular';

import { FileUploadComponent } from './file-upload.component';

describe('FileUploadComponent', () => {
  const loader = jest.fn();
  const mockFiles = {
    0: {
      name: 'nodes.csv',
      type: 'text/csv',
    } as File,
    length: 1,
  } as unknown as FileList;

  beforeEach(() => {
    loader.mockReturnValue({
      progress: signal(0),
      result: Promise.resolve('abc'),
    });
  });

  it('should load', async () => {
    const {
      fixture: { componentInstance: instance },
    } = await render(FileUploadComponent, {
      componentInputs: {
        accept: 'csv',
        loader: loader,
        options: {},
      },
    });

    instance.load({ files: mockFiles } as HTMLInputElement);
    expect(screen.getByText(/Upload CSV/i)).toBeInTheDocument();
  });

  it('should announce upload errors to screen readers', async () => {
    await render(FileUploadComponent, {
      componentInputs: {
        accept: 'csv',
        loader: loader,
        options: {},
        errorMessage: 'File is empty.',
        errorActionMessage: 'Please upload a non-empty CSV file.',
      },
    });

    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('File is empty.');
    expect(alert).toHaveTextContent('Please upload a non-empty CSV file.');
  });

  it('should cancel load', async () => {
    const loadCancelled = jest.fn();
    const {
      fixture: { componentInstance: instance },
    } = await render(FileUploadComponent, {
      componentInputs: {
        accept: 'csv',
        loader: loader,
        options: {},
      },
      componentOutputs: {
        loadCancelled: {
          emit: loadCancelled,
        } as unknown as OutputEmitterRef<void>,
      },
    });

    TestBed.inject(Injector);
    instance.cancelLoad();
    expect(loadCancelled).toHaveBeenCalled();
  });
});
