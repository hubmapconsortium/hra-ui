import { booleanAttribute, inject } from '@angular/core';
import { DialogService } from '@hra-ui/design-system/dialog';
import { filter, fromEvent, map, startWith, Subscription, switchAll, take, throttleTime } from 'rxjs';
import { EMPTY_SUBSCRIPTION } from 'rxjs/internal/Subscription';

/** Default screen size notice storage key */
const DEFAULT_SCREEN_SIZE_NOTICE_STORAGE_KEY = 'hra-screen-size-notice';
/** Default screen size dialog tagline */
const TAGLINE = 'Heads up!';
/** Default screen size dialog message */
const MESSAGE = 'This website is optimized for Chrome or Firefox on a minimum resolution of 1280x810.';

/** Max screen width to show screen size notice */
export const SCREEN_SIZE_NOTICE_MAX_WIDTH = 1280;
/** Max screen height to show screen size notice */
export const SCREEN_SIZE_NOTICE_MAX_HEIGHT = 810;

/**
 * Creates detector to launch the screen size notice dialog when the window is resized below a certain size
 */
export function createScreenSizeDetector(): Subscription {
  const dialogService = inject(DialogService);
  const storageKey = DEFAULT_SCREEN_SIZE_NOTICE_STORAGE_KEY;
  const initialStorageValue = booleanAttribute(localStorage.getItem(storageKey));

  if (initialStorageValue) {
    return EMPTY_SUBSCRIPTION;
  }

  const testScreenSize = () =>
    window.innerWidth < SCREEN_SIZE_NOTICE_MAX_WIDTH || window.innerHeight < SCREEN_SIZE_NOTICE_MAX_HEIGHT;

  const afterClosed$ = fromEvent(window, 'resize').pipe(
    throttleTime(50),
    startWith({}),
    filter(testScreenSize),
    take(1),
    map(() => dialogService.openNotice(TAGLINE, MESSAGE)),
    map((ref) => ref.afterClosed()),
    switchAll(),
  );

  return afterClosed$.subscribe(() => {
    localStorage.setItem(storageKey, 'true');
  });
}
