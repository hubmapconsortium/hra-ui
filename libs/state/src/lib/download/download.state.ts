import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Action, NgxsOnInit, State } from '@ngxs/store';
import produce from 'immer';
import { Observable, tap } from 'rxjs';

import { PNG_FORMAT, SVG_FORMAT } from './builtin-formats';
import { Download, RegisterFormat } from './download.action';
import { DownloadContext, DownloadFormatId, DownloadModel } from './download.model';

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
  private readonly http = inject(HttpClient);

  ngxsOnInit(ctx: DownloadContext): void {
    ctx.dispatch([new RegisterFormat(SVG_FORMAT), new RegisterFormat(PNG_FORMAT)]);
  }

  /**
   * Infers filename from file url
   * @param fileUrl
   * @returns
   */
  // inferFilename(fileUrl: string) {
  //   fileUrl.match(/$/)?.[0] ?? '';
  //   return fileUrl.substring(fileUrl.lastIndexOf('/') + 1, fileUrl.lastIndexOf('.'));
  // }

  @Action(RegisterFormat)
  registerFormat(ctx: DownloadContext, { format }: RegisterFormat): void {
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
  download(ctx: DownloadContext, { format }: Download): Observable<unknown> | void {
    const { entries } = ctx.getState();
    const entry = entries[format];
    const filename = this.guessFilename(ctx, format);
    switch (entry?.type) {
      case 'url':
        return this.downloadRemoteData(entry.url).pipe(tap((data) => this.downloadData(data, filename)));

      case 'data':
        this.downloadData(new Blob([entry.data]), filename);
        break;

      default:
        throw new Error('Cannot download file without data');
    }
  }

  private guessFilename(ctx: DownloadContext, id: DownloadFormatId): string {
    const { formats } = ctx.getState();
    const format = formats[id];
    // TODO
    return '';
  }

  /**
   * Download converted formatted file to browser
   * @param blob
   * @param fileName
   */
  private downloadData(blob: Blob, filename: string) {
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    document.body.appendChild(anchor);
    anchor.download = filename;
    anchor.href = url;
    anchor.click();
    anchor.remove();
    window.URL.revokeObjectURL(url);
  }

  /**
   * Downloads and save -  method is used to direct fetch file
   * if available on url without conversion
   * @param fileUrl
   * @param fileName
   */
  private downloadRemoteData(url: string): Observable<Blob> {
    return this.http.get(url, { responseType: 'blob' });
  }
}
