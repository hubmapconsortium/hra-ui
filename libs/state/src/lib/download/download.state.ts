import { Action, NgxsOnInit, State, StateContext } from '@ngxs/store';
import produce from 'immer';
import { convertToPng } from './builtin-converters';
import { PNG_FORMAT, SVG_FORMAT } from './builtin-formats';
import { Download, RegisterFormat } from './download.action';
import { DownloadContext, DownloadDataConverter, DownloadFormatId, DownloadModel, FileFormat } from './download.model';

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
  defaults: {
    formats: {},
    entries: {},
  },
})
export class DownloadState implements NgxsOnInit {
  readonly converters: Record<DownloadFormatId, DownloadDataConverter | undefined> = {};

  ngxsOnInit(ctx: DownloadContext): void {
    ctx.dispatch([new RegisterFormat(SVG_FORMAT), new RegisterFormat(PNG_FORMAT, convertToPng)]);
  }

  /**
   * Infers filename from file url
   * @param fileUrl
   * @returns
   */
  inferFilename(fileUrl: string) {
    fileUrl.match(/$/)?.[0] ?? '';
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
  async downloadRemoteData(fileUrl: string, fileName: string) {
    const response = await fetch(fileUrl);
    const data = await response.blob();
    this.downloadData(data, fileName);
  }

  @Action(RegisterFormat)
  registerFormat(ctx: DownloadContext, { format, converter }: RegisterFormat): void {
    this.converters[format.id] = converter;
    ctx.setState(
      produce((draft) => {
        draft.formats[format.id] = format;
      })
    );
  }

  /**
   * Actions download file in specified format
   * @param ctx
   * @param action
   */
  @Action(Download)
  async download(ctx: DownloadContext, { format }: Download) {
    const { entries } = ctx.getState();
    const entry = entries[format];
    switch (entry?.type) {
      case 'url':
        // Download
        break;

      case 'data':
        this.downloadData(new Blob([entry.data]), ''); // TODO filename
        break;

      default: {
        const data = await this.convertToFormat(ctx, format);
        if (!data) {
          throw new Error('No url or data specified for format');
        }

        this.downloadData(data, ''); // TODO filename
        break;
      }
    }
    // const fileName = this.inferFilename(fileUrl);
    // const fileExt = this.inferFileExtension(fileUrl);

    // if (format == fileExt) {
    //   await this.downloadRemoteData(fileUrl, fileName);
    //   return;
    // }

    // switch (format) {
    //   case FileFormat.PDF:
    //     await this.convertFileToPdf(fileName, fileUrl);
    //     break;
    //   case FileFormat.PNG:
    //     await this.convertFileToPng(fileName, fileUrl);
    //     break;
    // }
  }

  private async convertToFormat(ctx: DownloadContext, format: DownloadFormatId): Promise<Blob | void> {
    const { formats, entries } = ctx.getState();
    const { fallbacks = [] } = formats[format] ?? {};
    for (const id of fallbacks) {
      const entry = entries[id];
      const converter = this.converters[id];
      if (entry && converter) {
        // get entry data
        return converter(new Blob(), id);
      }
    }
  }

  /**
   * Download converted formatted file to browser
   * @param blob
   * @param fileName
   */
  private downloadData(blob: Blob, fileName: string) {
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
  async convertImageToCanvas(image: HTMLImageElement): Promise<HTMLCanvasElement> {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Failed to convert image to canvas');
    }
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
    return canvas;
  }

  /**
   * Converts SVG file to pdf
   * @param fileName
   * @param surl -  source file url
   */
  async convertFileToPdf(fileName: string, surl: string): Promise<void> {
    const image = await this.downloadImage(surl);
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();
    doc.addImage(image, 0, 0, image.width, image.height);
    doc.save(fileName + '.pdf');
  }

  /**
   * Converts SVG file to png
   * @param fileName
   * @param surl
   */
  async convertFileToPng(fileName: string, surl: string) {
    const imageCanvas = await this.convertImageToCanvas(await this.downloadImage(surl));
    const imageBlob = new Promise((resolve) => imageCanvas.toBlob(resolve, 'image/png'));
    this.downloadData((await imageBlob) as Blob, fileName + '.png');
  }
}
