import { HttpClient } from '@angular/common/http';
import { State, Action, StateContext } from '@ngxs/store';
import { DownloadFile, FileFormat } from './download-file.action';

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
  constructor(private http: HttpClient) {}

  getFile() {
    const url = 'assests/compass.svg';
    this.http.get(url, { responseType: 'blob' }).subscribe((data: Blob) => {
      const blob = new Blob([data], { type: 'application/svg' });
      console.log('data: ' + blob);
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.download = 'file.pdf';
      anchor.href = url;
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  }

  @Action(DownloadFile)
  async downloadFile(ctx: StateContext<DownloadStateModel>, action: DownloadFile) {
    // Fetch the SVG file from the URL

    this.getFile();
    const svgContent = '';
    let blob: Blob | null = null;

    // Convert the SVG file to the desired format based on the file extension of the fileName property
    switch (action.selectedFormat) {
      case FileFormat.PDF:
        blob = await this.convertFileToPdf(svgContent);
        break;
      case FileFormat.PNG:
        blob = await this.convertFileToPng(svgContent);
        break;
      case FileFormat.AI:
        blob = await this.convertFileToAi(svgContent);
        break;
      default:
        console.error('Unsupported file format.');
        break;
    }

    if (blob) {
      // Create a new File object from the blob and update the state
      const file = new File([blob], action.fileName);
      ctx.patchState({ file });
    }
  }

  // Converts the SVG file to PDF format
  convertFileToPdf(svgContent: string): Promise<Blob> {
    // Replace with your file conversion code
    return Promise.resolve(new Blob([svgContent], { type: 'application/pdf' }));
  }

  // Converts the SVG file to PNG format
  convertFileToPng(svgContent: string): Promise<Blob> {
    // Replace with your file conversion code
    return Promise.resolve(new Blob([svgContent], { type: 'image/png' }));
  }

  // Converts the SVG file to Adobe Illustrator format
  convertFileToAi(svgContent: string): Promise<Blob> {
    // Replace with your file conversion code
    return Promise.resolve(new Blob([svgContent], { type: 'application/postscript' }));
  }
}
