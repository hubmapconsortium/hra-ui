import { assertInInjectionContext, booleanAttribute, effect, inject, Signal, signal } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { watchBreakpoints } from '@hra-ui/cdk/breakpoints';
import { DialogService } from '@hra-ui/design-system/dialog';
import store from 'store2';

/** Options for screen size notice */
export interface ScreenSizeNoticeOptions {
  /** Minimum screen width to not display the screen size notice */
  width: number;
  /** Minimum screen height to not display the screen size notice. Leave it out to check the width only. */
  height?: number;
  /**
   * Local storage key that remembers a dismissed notice. Defaults to the key all HRA apps share,
   * so a notice dismissed in one app stays dismissed in the others.
   */
  storageKey?: string;
}

/** Screen size notice storage key */
const SCREEN_SIZE_NOTICE_STORAGE_KEY = '__hra-screen-size-notice-dismissed';

/** Monitors screen size and opens/closes screen size notice dialog as needed */
export function initializeScreenSizeNoticeMonitor(
  options: ScreenSizeNoticeOptions,
  disabled: Signal<boolean> = signal(false),
): void {
  assertInInjectionContext(initializeScreenSizeNoticeMonitor);

  const { width, height, storageKey = SCREEN_SIZE_NOTICE_STORAGE_KEY } = options;
  const queries = height === undefined ? [`(width < ${width}px)`] : [`(width < ${width}px)`, `(height < ${height}px)`];
  const message =
    height === undefined
      ? `This page is optimized for Chrome or Firefox on screens at least ${width}px wide.`
      : `This website is optimized for Chrome or Firefox on a minimum resolution of ${width}x${height}.`;
  const breakpoints = watchBreakpoints(queries);
  const dialogService = inject(DialogService);
  const dismissed = booleanAttribute(store.local.get(storageKey));
  let activeNotice: MatDialogRef<unknown, 'program'> | undefined;

  if (!dismissed) {
    const ref = effect(() => {
      if (!disabled() && breakpoints().matchesAny()) {
        if (!activeNotice) {
          activeNotice = dialogService.openNotice('Heads up!', message);

          activeNotice.afterClosed().subscribe((value) => {
            if (value !== 'program') {
              store.local.set(storageKey, true);
              ref.destroy();
            }
          });
        }
      } else {
        activeNotice?.close('program');
        activeNotice = undefined;
      }
    });
  }
}
