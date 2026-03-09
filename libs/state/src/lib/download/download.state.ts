import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Action, NgxsOnInit, State } from '@ngxs/store';
import { produce } from 'immer';
import { Observable, tap } from 'rxjs';

import { SnackbarService } from '@hra-ui/design-system/snackbar';
import { FtuDataService } from '@hra-ui/services';
import { unparse } from 'papaparse';
import { JSON_FORMAT, PNG_FORMAT, SVG_FORMAT } from './builtin-formats';
import {
  AddEntry,
  ClearEntries,
  Download,
  DownloadCsv,
  DownloadSummaries,
  Load,
  RegisterFormat,
} from './download.action';
import { createDownloadFormatId, DownloadContext, DownloadFormatId, DownloadModel } from './download.model';

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
  /** Http object inject for download state */
  private readonly http = inject(HttpClient);

  /** Data service of download state */
  private readonly dataService = inject(FtuDataService);

  /** Snackbar service */
  private readonly snackbar = inject(SnackbarService);

  /**
   * Ngxs on init and registry default format
   * @param ctx
   */
  ngxsOnInit(ctx: DownloadContext): void {
    ctx.dispatch([new RegisterFormat(PNG_FORMAT), new RegisterFormat(SVG_FORMAT), new RegisterFormat(JSON_FORMAT)]);
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
      }),
    );
  }

  /**
   * Action to add the Organs IRI from the data service
   * @param ctx Context
   * @param iri Organ Data
   * @returns
   */
  @Action(Load)
  load(ctx: DownloadContext, { iri }: Load): Observable<unknown> {
    return this.dataService.getDataFileReferences(iri).pipe(
      tap((items) =>
        ctx.setState(
          produce((draft) => {
            draft.entries = {};
            for (const { format, url } of items) {
              draft.entries[createDownloadFormatId(format)] = { type: 'url', url };
            }
          }),
        ),
      ),
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
      }),
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
      }),
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
        return this.downloadRemoteData(entry.url).pipe(tap((data) => void this.downloadData(data, filename)));
      }

      case 'data': {
        const filename = this.guessFilename(ctx, format, '');
        void this.downloadData(new Blob([entry.data]), filename);
        break;
      }

      default:
        throw new Error('Cannot download file without data');
    }
  }

  /**
   * Download summaries action to download cell summary data in json format
   * @param ctx Context
   * @param { summaries } Summaries to be downloaded
   * @returns Observable of download action or void
   */
  @Action(DownloadSummaries)
  downloadSummaries(ctx: DownloadContext, { summaries }: DownloadSummaries): Observable<unknown> | void {
    void this.downloadData(new Blob([JSON.stringify(summaries)]), 'cell-summaries.json');
  }

  /**
   * Download CSV action to download source reference data in csv format
   * @param ctx Context
   * @param { sourceRefs, id } sourceRefs to be downloaded and id for filename guess
   * @returns Observable of download action or void
   */
  @Action(DownloadCsv)
  downloadCsv(ctx: DownloadContext, { sourceRefs, id }: DownloadCsv): Observable<unknown> | void {
    const filename = this.guessFilename(ctx, createDownloadFormatId('csv'), id as string);
    const csvContent = unparse(sourceRefs);
    void this.downloadData(new Blob([csvContent], { type: 'text/csv' }), filename);
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
  private async downloadData(blob: Blob, filename: string): Promise<void> {
    const saveStatus = await this.saveWithFilePicker(blob, filename);

    if (saveStatus === 'saved') {
      this.snackbar.open('File downloaded', '', false, 'start', { duration: 5000 });
      return;
    }

    if (saveStatus === 'canceled') {
      return;
    }

    this.downloadWithAnchor(blob, filename);
  }

  /**
   * Uses the browser save-file dialog when supported.
   * Returns save status so cancel can be handled without fallback.
   */
  private async saveWithFilePicker(blob: Blob, filename: string): Promise<'saved' | 'canceled' | 'unsupported'> {
    const picker = (
      window as Window & {
        showSaveFilePicker?: (options: { suggestedName: string }) => Promise<{
          createWritable: () => Promise<{ write: (data: Blob) => Promise<void>; close: () => Promise<void> }>;
        }>;
      }
    ).showSaveFilePicker;

    if (!picker) {
      return 'unsupported';
    }

    try {
      const handle = await picker({ suggestedName: filename });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return 'saved';
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return 'canceled';
      }

      return 'unsupported';
    }
  }

  /**
   * Fallback for browsers without file picker support.
   */
  private downloadWithAnchor(blob: Blob, filename: string): void {
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    document.body.appendChild(anchor);
    anchor.download = filename;
    anchor.href = url;
    anchor.click();
    anchor.remove();
    window.URL.revokeObjectURL(url);
    this.snackbar.open('File downloaded', '', false, 'start', { duration: 5000 });
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
