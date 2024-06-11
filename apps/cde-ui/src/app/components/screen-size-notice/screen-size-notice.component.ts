import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, inject, Injector } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { filter, fromEvent, map, startWith, Subscription, switchAll, take, throttleTime } from 'rxjs';
import { EMPTY_SUBSCRIPTION } from 'rxjs/internal/Subscription';

/**
 * Screen size notice detector options
 */
export interface ScreenSizeNoticeDetectorOptions {
  /** Max width to show screen size notice */
  width: number;
  /** Max height to show screen size notice */
  height: number;
  /** Name of localStorage key used to store if the notice has been shown or not*/
  storageKey?: string;
  /** Injector for MatDialog */
  injector?: Injector;
}

/** Default screen size notice storage key */
export const DEFAULT_SCREEN_SIZE_NOTICE_STORAGE_KEY = 'cde-screen-size-notice';

/**
 * Notice to inform users if the screen size is smaller than optimal
 */
@Component({
  selector: 'cde-screen-size-notice',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './screen-size-notice.component.html',
  styleUrl: './screen-size-notice.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenSizeNoticeComponent {
  /**
   * Creates detector to launch the screen size notice dialog when the window is resized below a certain size
   */
  static createDetector(options: ScreenSizeNoticeDetectorOptions): Subscription {
    const { width, height, storageKey = DEFAULT_SCREEN_SIZE_NOTICE_STORAGE_KEY } = options;
    const initialStorageValue = booleanAttribute(localStorage.getItem(storageKey));
    if (initialStorageValue) {
      return EMPTY_SUBSCRIPTION;
    }

    const injector = options.injector ?? inject(Injector);
    const dialog = injector.get(MatDialog);
    const testScreenSize = () => window.innerWidth < width || window.innerHeight < height;
    const afterClosed$ = fromEvent(window, 'resize').pipe(
      throttleTime(50),
      startWith({}),
      filter(testScreenSize),
      take(1),
      map(() => this.launchNotice(dialog)),
      map((ref) => ref.afterClosed()),
      switchAll(),
    );

    return afterClosed$.subscribe(() => {
      localStorage.setItem(storageKey, 'true');
    });
  }

  /**
   * Launches screen size notice
   */
  static launchNotice(dialog: MatDialog): MatDialogRef<ScreenSizeNoticeComponent, never> {
    return dialog.open(ScreenSizeNoticeComponent, {
      panelClass: 'screen-size-notice-panel',
      minWidth: '485px',
      disableClose: true,
      closeOnNavigation: false,
    });
  }
}
