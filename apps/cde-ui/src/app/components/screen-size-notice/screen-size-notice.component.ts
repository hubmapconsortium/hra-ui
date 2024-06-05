import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Injector, booleanAttribute, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Subscription, filter, fromEvent, map, startWith, switchAll, take, throttleTime } from 'rxjs';
import { EMPTY_SUBSCRIPTION } from 'rxjs/internal/Subscription';

export interface ScreenSizeNoticeDetectorOptions {
  width: number;
  height: number;
  storageKey?: string;
  injector?: Injector;
}

export const DEFAULT_SCREEN_SIZE_NOTICE_STORAGE_KEY = 'cde-screen-size-notice';

@Component({
  selector: 'cde-screen-size-notice',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './screen-size-notice.component.html',
  styleUrl: './screen-size-notice.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenSizeNoticeComponent {
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

  static launchNotice(dialog: MatDialog): MatDialogRef<ScreenSizeNoticeComponent, never> {
    return dialog.open(ScreenSizeNoticeComponent, {
      panelClass: 'screen-size-notice-panel',
      minWidth: '485px',
      disableClose: true,
      closeOnNavigation: false,
    });
  }
}
