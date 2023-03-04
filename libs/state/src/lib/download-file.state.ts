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
  @Action(DownloadFile)
  async downloadFile(ctx: StateContext<DownloadStateModel>, action: DownloadFile) {
    // Fetch the SVG file from the URL
    const response = await fetch(action.url);
    const svgContent = await response.text();
    let blob: Blob | null = null;

    // Convert the SVG file to the desired format based on the file extension of the fileName property
    switch (action.selectedFormat) {
      case FileFormat.PDF:
        blob = await action.convertFileToPdf(svgContent);
        break;
      case FileFormat.PNG:
        blob = await action.convertFileToPng(svgContent);
        break;
      case FileFormat.AI:
        blob = await action.convertFileToAi(svgContent);
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

  /**
   * Converts file to pdf
   * @param svgContent
   * @returns file to pdf
   */
  convertFileToPdf(svgContent: string): Promise<Blob> {
    // file conversion code
    return Promise.resolve(new Blob([svgContent], { type: 'application/pdf' }));
  }

  /**
   * Converts file to png
   * @param svgContent
   * @returns file to png
   */
  convertFileToPng(svgContent: string): Promise<Blob> {
    // file conversion code
    return Promise.resolve(new Blob([svgContent], { type: 'image/png' }));
  }

  /**
   * Converts file to ai
   * @param svgContent
   * @returns file to ai
   */
  convertFileToAi(svgContent: string): Promise<Blob> {
    // file conversion code
    return Promise.resolve(new Blob([svgContent], { type: 'application/postscript' }));
  }
}
