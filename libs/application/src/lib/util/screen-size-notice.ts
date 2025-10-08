import { assertInInjectionContext, booleanAttribute, effect, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { watchBreakpoints } from '@hra-ui/cdk/breakpoints';
import { DialogService } from '@hra-ui/design-system/dialog';
import store from 'store2';

/** Options for screen size notice */
export interface ScreenSizeNoticeOptions {
  /** Minimum screen width to not display the screen size notice */
  width: number;
  /** Maximum screen width to not display the screen size notice */
  height: number;
}

/** Screen size notice storage key */
const SCREEN_SIZE_NOTICE_STORAGE_KEY = '__hra-screen-size-notice-dismissed';

/** Monitors screen size and opens/closes screen size notice dialog as needed */
export function initializeScreenSizeNoticeMonitor(options: ScreenSizeNoticeOptions): void {
  assertInInjectionContext(initializeScreenSizeNoticeMonitor);

  const { width, height } = options;
  const queries = [`(width < ${width}px)`, `(height < ${height}px)`];
  const breakpoints = watchBreakpoints(queries);
  const dialogService = inject(DialogService);
  const dismissed = booleanAttribute(store.local.get(SCREEN_SIZE_NOTICE_STORAGE_KEY));
  let activeNotice: MatDialogRef<unknown, 'program'> | undefined;

  if (!dismissed) {
    const ref = effect(() => {
      if (breakpoints().matchesAny()) {
        if (!activeNotice) {
          activeNotice = dialogService.openNotice(
            'Heads up!',
            `This website is optimized for Chrome or Firefox on a minimum resolution of ${width}x${height}.`,
          );

          activeNotice.afterClosed().subscribe((value) => {
            if (value !== 'program') {
              store.local.set(SCREEN_SIZE_NOTICE_STORAGE_KEY, true);
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
