import { ChangeDetectorRef, Injectable, Injector, OutputEmitterRef, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileLoader, FileLoaderEvent } from '@hra-ui/common/fs';
import { render, screen } from '@testing-library/angular';
import { NEVER, Observable } from 'rxjs';

import { FileUploadComponent } from './file-upload.component';

/** Loader that never finishes, so the file stays in the loading state */
@Injectable({ providedIn: 'root' })
class PendingLoader implements FileLoader<unknown, unknown> {
  load(): Observable<FileLoaderEvent<unknown>> {
    return NEVER;
  }
}

/** Re-renders an OnPush component after calling its methods directly */
async function rerender(fixture: ComponentFixture<unknown>): Promise<void> {
  fixture.componentRef.injector.get(ChangeDetectorRef).markForCheck();
  fixture.detectChanges();
  await fixture.whenStable();
}

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

  it('should use the provided accessible name for the upload button', async () => {
    await render(FileUploadComponent, {
      componentInputs: {
        accept: 'csv',
        loader: loader,
        options: {},
        uploadAriaLabel: 'Upload CSV for cell data',
      },
    });

    expect(screen.getByRole('button', { name: 'Upload CSV for cell data' })).toHaveTextContent('Upload CSV');
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

  it('should keep keyboard focus when swapping the upload and delete buttons', async () => {
    const { fixture } = await render(FileUploadComponent, {
      componentInputs: {
        accept: 'text/csv,.csv',
        loader: PendingLoader,
        options: {},
      },
    });
    const instance = fixture.componentInstance;

    screen.getByRole('button', { name: 'Upload CSV' }).focus();
    instance.load({ files: mockFiles } as HTMLInputElement);
    await rerender(fixture);
    expect(screen.getByRole('button', { name: 'Delete file' })).toHaveFocus();

    instance.cancelLoad();
    await rerender(fixture);
    expect(screen.getByRole('button', { name: 'Upload CSV' })).toHaveFocus();
  });

  it('should leave focus alone when it is outside the component', async () => {
    const { fixture } = await render(FileUploadComponent, {
      componentInputs: {
        accept: 'text/csv,.csv',
        loader: PendingLoader,
        options: {},
      },
    });

    fixture.componentInstance.load({ files: mockFiles } as HTMLInputElement);
    await rerender(fixture);
    expect(screen.getByRole('button', { name: 'Delete file' })).not.toHaveFocus();
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
