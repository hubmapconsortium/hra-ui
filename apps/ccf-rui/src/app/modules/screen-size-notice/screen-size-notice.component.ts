import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ButtonModule } from '@hra-ui/design-system/button';

/** Default screen size notice storage key */
export const DEFAULT_SCREEN_SIZE_NOTICE_STORAGE_KEY = 'rui-screen-size-notice';

/** Max width to show screen size notice */
export const SCREEN_SIZE_NOTICE_MAX_WIDTH = 1280;
/** Max height to show screen size notice */
export const SCREEN_SIZE_NOTICE_MAX_HEIGHT = 832;

/**
 * Notice to inform users if the screen size is smaller than optimal
 */
@Component({
  selector: 'ccf-screen-size-notice',
  standalone: true,
  imports: [CommonModule, ButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './screen-size-notice.component.html',
  styleUrl: './screen-size-notice.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenSizeNoticeComponent {}
