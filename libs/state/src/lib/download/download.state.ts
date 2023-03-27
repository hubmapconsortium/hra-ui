import { Action, State, StateContext } from '@ngxs/store';
import { Download } from './download.action';
import { DownloadModel, FileFormat } from './download.model';

//TODO: For testing purpose only
/**
 * this is file url which will be picked from
 * other state later
 */
const fileUrl = 'assets/compass.svg';

/**
 * Download State Model used to convert
 * file from SVG file content to different
 * format and download to user.
 */
@State<DownloadModel>({
  name: 'download',
  defaults: [
    {
      format: FileFormat.PDF,
      label: 'Download PDF',
    },
  ],
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
   * Infers filename from file url
   * @param fileUrl
   * @returns
   */
  inferFilename(fileUrl: string) {
    return fileUrl.substring(fileUrl.lastIndexOf('/') + 1, fileUrl.lastIndexOf('.'));
  }

  /**
   * Infers file extension from file url
   * @param fileUrl
   * @returns
   */
  inferFileExtension(fileUrl: string) {
    return fileUrl.substring(fileUrl.lastIndexOf('.') + 1);
  }

  /**
   * Downloads and save -  method is used to direct fetch file
   * if available on url without conversion
   * @param fileUrl
   * @param fileName
   */
  async downloadAndSave(fileUrl: string, fileName: string) {
    const response = await fetch(fileUrl);
    const data = await response.blob();
    this.blobDownload(data, fileName);
  }

  /**
   * Actions download file in specified format
   * @param ctx
   * @param action
   */
  @Action(Download)
  async downloadFile(ctx: StateContext<DownloadModel>, action: Download) {
    const format = typeof action.format === 'string' ? action.format : action.format.format;
    const fileName = this.inferFilename(fileUrl);
    const fileExt = this.inferFileExtension(fileUrl);

    if (format == fileExt) {
      await this.downloadAndSave(fileUrl, fileName);
      return;
    }

    switch (format) {
      case FileFormat.PDF:
        await this.convertFileToPdf(fileName, fileUrl);
        break;
      case FileFormat.PNG:
        await this.convertFileToPng(fileName, fileUrl);
        break;
    }
  }

  /**
   * Downloads image from url and return HTMLImageElement
   * @param surl
   * @returns image
   */
  async downloadImage(surl: string): Promise<HTMLImageElement> {
    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.src = surl;
    await image.decode();
    return image;
  }

  /**
   * Creates canvas of svg from HTMLImageElement
   * @param surl
   * @returns canvas
   */
  async createCanvas(image: HTMLImageElement): Promise<HTMLCanvasElement> {
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
  async convertFileToPdf(fileName: string, surl: string): Promise<void> {
    const imageCanvas = await this.createCanvas(await this.downloadImage(surl));
    const { jsPDF } = await import('jspdf');
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
    const imageCanvas = await this.createCanvas(await this.downloadImage(surl));
    const imageBlob = new Promise((resolve) => imageCanvas.toBlob(resolve, 'image/png'));
    this.blobDownload((await imageBlob) as Blob, fileName + '.png');
  }
}
