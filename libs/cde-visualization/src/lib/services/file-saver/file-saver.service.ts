import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { unparse, UnparseConfig, UnparseObject } from 'papaparse';

@Injectable({
  providedIn: 'root',
})
export class FileSaverService {
  private readonly document = inject(DOCUMENT);
  private readonly snackbar = inject(MatSnackBar);

  save(url: string, filename: string): void {
    const { document } = this;
    const linkEl = document.createElement('a');

    linkEl.setAttribute('href', url);
    linkEl.setAttribute('target', '_blank');
    linkEl.setAttribute('download', filename);

    document.body.appendChild(linkEl);
    linkEl.dispatchEvent(new MouseEvent('click'));
    document.body.removeChild(linkEl);
    this.snackbar.open('File downloaded', undefined, { duration: 1000, panelClass: 'download-snackbar-panel' });
  }

  saveData(data: Blob, filename: string): void {
    const url = URL.createObjectURL(data);
    this.save(url, filename);
    URL.revokeObjectURL(url);
  }

  saveCsv<T>(data: T[] | UnparseObject<T>, filename: string, config?: UnparseConfig): void {
    const blob = new Blob([unparse(data, config)]);
    this.saveData(blob, filename);
  }
}
