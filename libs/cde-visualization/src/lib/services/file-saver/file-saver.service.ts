import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { UnparseConfig, UnparseObject, unparse } from 'papaparse';

@Injectable({
  providedIn: 'root',
})
export class FileSaverService {
  private readonly document = inject(DOCUMENT);

  save(url: string, filename: string): void {
    const { document } = this;
    const linkEl = document.createElement('a');

    linkEl.setAttribute('href', url);
    linkEl.setAttribute('target', '_blank');
    linkEl.setAttribute('download', filename);

    document.body.appendChild(linkEl);
    linkEl.dispatchEvent(new MouseEvent('click'));
    document.body.removeChild(linkEl);
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
