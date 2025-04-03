import { DOCUMENT } from '@angular/common';
import { ErrorHandler, Injectable, inject } from '@angular/core';

/** Service for downloading the files using fetch */
@Injectable({
  providedIn: 'root',
})
export class FileDownloadService {
  private readonly document = inject<Document>(DOCUMENT);
  private readonly errorHandler = inject(ErrorHandler);

  /** Creates a file like object and downloads it */
  async download(url: string, filename = this.getFilename(url)): Promise<void> {
    let blobUrl: string | undefined;

    try {
      const response = await fetch(url, {
        headers: new Headers({
          Origin: location.origin,
        }),
        mode: 'cors',
      });
      const data = await response.blob();
      blobUrl = URL.createObjectURL(data);
      this.createDownloadEl(blobUrl, filename);
    } catch (error) {
      this.errorHandler.handleError(error);
    } finally {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    }
  }

  /** Returns the file name from the URL */
  private getFilename(url: string): string {
    return url.split('\\').pop()?.split('/').pop() ?? '';
  }

  /** Constructs an anchor element to download the file */
  private createDownloadEl(blobUrl: string, filename: string): void {
    const el = this.document.createElement('a');
    el.href = blobUrl;
    el.download = filename;

    this.document.body.appendChild(el);
    el.click();
    el.remove();
  }
}
