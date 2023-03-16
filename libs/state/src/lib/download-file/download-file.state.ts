import { Action, State, StateContext } from '@ngxs/store';
import { jsPDF } from 'jspdf';
import { DownloadFile, FileFormat } from './download-file.action';

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
})
export class DownloadState {
  /**
   * Download converted formatted file to browser
   * @param blob
   * @param fileName
   */
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

  /**
   * Actions download file in specified format
   * @param ctx
   * @param action
   */
  @Action(DownloadFile)
  async downloadFile(ctx: StateContext<DownloadStateModel>, action: DownloadFile) {
    const fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1, fileUrl.lastIndexOf('.'));

    switch (action.selectedFormat) {
      case FileFormat.PDF:
        this.convertFileToPdf(fileName, fileUrl);
        break;
      case FileFormat.PNG:
        this.convertFileToPng(fileName, fileUrl);
        break;
      case FileFormat.AI:
        this.convertFileToAi(fileName, fileUrl);
        break;
    }
  }

  /**
   * Creates canvas of svg from source url
   * @param surl
   * @returns canvas
   */
  async createCanvas(surl: string): Promise<HTMLCanvasElement> {
    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.src = surl;
    await image.decode();

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    ctx?.drawImage(image, 0, 0);
    return canvas;
  }

  /**
   * Converts SVG file to pdf
   * @param fileName
   * @param surl -  source file url
   */
  async convertFileToPdf(fileName: string, surl: string) {
    const imageCanvas = await this.createCanvas(surl);
    const doc = new jsPDF();
    doc.addImage(imageCanvas.toDataURL(), 0, 0, imageCanvas.width, imageCanvas.height);
    doc.save(fileName + '.pdf');
  }

  /**
   * Converts SVG file to png
   * @param fileName
   * @param surl
   */
  async convertFileToPng(fileName: string, surl: string) {
    const imageCanvas = await this.createCanvas(surl);
    const imageBlob = new Promise((resolve) => imageCanvas.toBlob(resolve, 'image/png'));
    this.blobDownload((await imageBlob) as Blob, fileName + '.png');
  }

  /**
   * Converts SVG file to ai
   * @param fileName
   * @param surl
   */
  async convertFileToAi(fileName: string, surl: string) {
    console.log(fileName, surl);
  }
}
