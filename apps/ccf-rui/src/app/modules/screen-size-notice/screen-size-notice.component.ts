import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { filter, fromEvent, map, startWith, Subscription, switchAll, take, throttleTime } from 'rxjs';
import { EMPTY_SUBSCRIPTION } from 'rxjs/internal/Subscription';

/** Default screen size notice storage key */
export const DEFAULT_SCREEN_SIZE_NOTICE_STORAGE_KEY = 'rui-screen-size-notice';

/** Max width to show screen size notice */
export const SCREEN_SIZE_NOTICE_MAX_WIDTH = 1280;
/** Max height to show screen size notice */
export const SCREEN_SIZE_NOTICE_MAX_HEIGHT = 832;

export function openScreenSizeNotice(dialog: MatDialog): Subscription {
  const initialStorageValue = booleanAttribute(localStorage.getItem(DEFAULT_SCREEN_SIZE_NOTICE_STORAGE_KEY));
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
    map(() => {
      return dialog.open(ScreenSizeNoticeComponent, {
        panelClass: 'screen-size-notice-panel',
        width: '456px',
        disableClose: true,
        closeOnNavigation: false,
      });
    }),
    map((ref) => ref.afterClosed()),
    switchAll(),
  );

  return afterClosed$.subscribe(() => {
    localStorage.setItem(DEFAULT_SCREEN_SIZE_NOTICE_STORAGE_KEY, 'true');
  });
}

/**
 * Notice to inform users if the screen size is smaller than optimal
 */
@Component({
  selector: 'ccf-screen-size-notice',
  standalone: true,
  imports: [CommonModule, ButtonsModule, MatDialogModule, MatIconModule],
  templateUrl: './screen-size-notice.component.html',
  styleUrl: './screen-size-notice.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenSizeNoticeComponent {}
