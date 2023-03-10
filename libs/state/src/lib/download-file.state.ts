import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { DownloadFile, FileFormat } from './download-file.action';
import { convertSVGToPNGUrl } from 'svg-to-png-browser';

//TODO: For testing purpose only
const fileUrl = 'assets/compass.svg';

/**
 * Download state model
 */
export interface DownloadStateModel {
  file: File | null;
}

/**
 * Download State Model used to convert
 * file from SVG file content to different
 * format and download to user.
 */
@State<DownloadStateModel>({
  name: 'download',
  defaults: {
    file: null,
  },
})
export class DownloadState {
  private readonly http = inject(HttpClient);

  fileConversion(url: string, selectedFormat: string) {
    this.http.get(url, { responseType: 'blob' }).subscribe((data: Blob) => {
      const blob = new Blob([data], { type: 'application/svg' });
      switch (selectedFormat) {
        case FileFormat.PDF:
          this.convertFileToPdf(blob, 'test');
          break;
        case FileFormat.PNG:
          this.convertFileToPng(blob, 'test');
          break;
        case FileFormat.AI:
          this.convertFileToAi(blob, 'test');
          break;
        default:
          console.error('Unsupported file format.');
          break;
      }
    });
  }

  blobDownload(blob: Blob, fileName: string) {
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    document.body.appendChild(anchor);
    anchor.download = fileName;
    anchor.href = url;
    anchor.click();
    anchor.remove();
    window.URL.revokeObjectURL(url);
  }

  @Action(DownloadFile)
  async downloadFile(ctx: StateContext<DownloadStateModel>, action: DownloadFile) {
    // Fetch the SVG file from the URL

    this.fileConversion(fileUrl, action.selectedFormat);
  }

  // Converts the SVG file to PDF format
  async convertFileToPdf(blob: Blob, fileName: string) {
    this.blobDownload(new Blob([blob], { type: 'application/pdf' }), fileName + '.pdf');
  }

  // Converts the SVG file to PNG format
  convertFileToPng(blob: Blob, fileName: string) {
    // Replace with your file conversion code
    convertSVGToPNGUrl(blob);
    this.blobDownload(new Blob([blob], { type: 'image/png' }), fileName + '.png');
  }

  // Converts the SVG file to Adobe Illustrator format
  convertFileToAi(blob: Blob, fileName: string) {
    // Replace with your file conversion code
    this.blobDownload(new Blob([blob], { type: 'application/postscript' }), fileName + '.ai');
  }
}
