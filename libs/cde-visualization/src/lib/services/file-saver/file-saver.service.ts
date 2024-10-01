import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { SnackbarService } from '@hra-ui/design-system/snackbar';
import { unparse, UnparseConfig, UnparseObject } from 'papaparse';

/**
 * FileSaver Service
 */
@Injectable({
  providedIn: 'root',
})
export class FileSaverService {
  /** Injects the document object */
  private readonly document = inject(DOCUMENT);

  /** Injects the MatSnackBar service for notifications */
  private readonly snackbar = inject(SnackbarService);

  /** Saves a file from a URL with a given filename */
  save(url: string, filename: string): void {
    const { document } = this;
    const linkEl = document.createElement('a');

    linkEl.setAttribute('href', url);
    linkEl.setAttribute('target', '_blank');
    linkEl.setAttribute('download', filename);

    document.body.appendChild(linkEl);
    linkEl.dispatchEvent(new MouseEvent('click'));
    document.body.removeChild(linkEl);
    this.snackbar.open('File downloaded', '', false, 'end', { duration: 1000 });
  }

  /** Saves a Blob as a file with a given filename */
  saveData(data: Blob, filename: string): void {
    const url = URL.createObjectURL(data);
    this.save(url, filename);
    URL.revokeObjectURL(url);
  }

  /** Saves data as a CSV file with a given filename and configuration */
  saveCsv<T>(data: T[] | UnparseObject<T>, filename: string, config?: UnparseConfig): void {
    const blob = new Blob([unparse(data, config)]);
    this.saveData(blob, filename);
  }
}
