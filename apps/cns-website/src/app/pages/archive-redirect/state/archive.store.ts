import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { deriveLoading } from 'ngxtension/derive-loading';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { ArchiveEntry, ArchiveService } from './archive.service';

/** Archive state interface */
interface ArchiveState {
  /** Whether the archive entries are loading */
  isLoading: boolean;
  /** The loaded archive entries, or null if not loaded */
  entries: ArchiveEntry[] | null;
}

/** Initial archive state */
const initialState: ArchiveState = {
  isLoading: false,
  entries: null,
};

/** Archive store */
export const ArchiveStore = signalStore(
  withState(initialState),
  withMethods((store, archiveService = inject(ArchiveService)) => ({
    getEntryBefore: (timestamp: number) => {
      return store.entries()?.reduce<ArchiveEntry | undefined>((result, entry) => {
        if (entry.timestamp <= timestamp && (!result || result.timestamp < entry.timestamp)) {
          return entry;
        }

        return result;
      }, undefined);
    },
    loadEntries: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: false, entries: null })),
        switchMap((route) => archiveService.loadByRoute(route)),
        catchError(() => of([])),
        tap((entries) => patchState(store, { entries })),
        deriveLoading({ threshold: 200, loadingTime: 3000 }),
        tap((isLoading) => patchState(store, { isLoading })),
      ),
    ),
  })),
);
