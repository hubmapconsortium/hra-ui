import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Action, NgxsOnInit, State } from '@ngxs/store';
import produce from 'immer';
import { Observable, tap } from 'rxjs';

import { PNG_FORMAT, SVG_FORMAT } from './builtin-formats';
import { AddEntry, ClearEntries, Download, RegisterFormat } from './download.action';
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
@Injectable()
export class DownloadState implements NgxsOnInit {
  /**
   * Http object inject for download state
   */
  private readonly http = inject(HttpClient);

  /**
   * Ngxs on init and registry default format
   * @param ctx
   */
  ngxsOnInit(ctx: DownloadContext): void {
    ctx.dispatch([new RegisterFormat(SVG_FORMAT), new RegisterFormat(PNG_FORMAT)]);
  }

  /**
   * Actions register format in Download State
   * @param ctx
   * @param { format }
   */
  @Action(RegisterFormat)
  registerFormat(ctx: DownloadContext, { format }: RegisterFormat): void {
    ctx.setState(
      produce((draft) => {
        draft.formats[format.id] = format;
      })
    );
  }

  /**
   * Add entry into download state
   * @param ctx
   * @param { id, entry }
   */
  @Action(AddEntry)
  addEntry(ctx: DownloadContext, { id, entry }: AddEntry): void {
    ctx.setState(
      produce((draft) => {
        draft.entries[id] = entry;
      })
    );
  }

  /**
   * Clear entires from download state
   * @param ctx
   */
  @Action(ClearEntries)
  clearEntries(ctx: DownloadContext): void {
    ctx.setState(
      produce((draft) => {
        draft.entries = {};
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
    switch (entry?.type) {
      case 'url': {
        const filename = this.guessFilename(ctx, format, entry.url);
        return this.downloadRemoteData(entry.url).pipe(tap((data) => this.downloadData(data, filename)));
      }

      case 'data': {
        const filename = this.guessFilename(ctx, format, '');
        this.downloadData(new Blob([entry.data]), filename);
        break;
      }

      default:
        throw new Error('Cannot download file without data');
    }
  }

  /**
   * Guess filename
   * @param ctx
   * @param id
   * @param url
   * @returns filename
   */
  private guessFilename(ctx: DownloadContext, id: DownloadFormatId, url: string): string {
    const { formats } = ctx.getState();
    const { extension = '' } = formats[id] ?? {};
    const fakeBase = 'https://base.com';
    const path = new URL(url, fakeBase).pathname;
    const segments = path.split('/').filter((seg) => seg !== '');
    const name = segments.length > 0 ? segments[segments.length - 1] : 'download';
    const guess = name.includes('.') ? name : `${name}${extension}`;

    return guess;
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
