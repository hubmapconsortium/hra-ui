import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import { MatListModule } from '@angular/material/list';
import { LinkDirective } from '@hra-ui/cdk';
import { EMPTY_LINK } from '@hra-ui/cdk/state';
/**
 * Base type for different download format options.
 */
export interface DownloadFormat {
  /**
   * User readable format label
   */
  label: string;
}

/**
 * Positioning value for the download list popup
 */
const DOWNLOADS_LIST_POSITION: ConnectedPosition[] = [
  {
    panelClass: 'above',
    originX: 'start',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'bottom',
    offsetY: 0,
  },
  {
    panelClass: 'below',
    originX: 'start',
    originY: 'bottom',
    overlayX: 'start',
    overlayY: 'top',
  },
];

/**
 * Component for footer that displays its content at the bottom of the page with different action buttons.
 */
@Component({
  selector: 'hra-footer',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, OverlayModule, MatListModule, LinkDirective],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent<T extends DownloadFormat = DownloadFormat> {
  /** Host binding of footer component */
  @HostBinding('class') @Input() size: 'small' | 'large' = 'large';

  /** Input for product logo URL to displayed on the left side. */
  @Input() productLogoUrl = '';

  /** Input for product title to displayed on the left side. */
  @Input() productTitle = '';

  @Input() hraPortal = EMPTY_LINK;

  /** Different download formats options displayed to the user */
  @Input() downloadFormats: T[] = [];

  /** Emits the selected download format */
  @Output() readonly download = new EventEmitter<T>();

  /** Emits when the illustration button is clicked */
  @Output() readonly illustrationClick = new EventEmitter<void>();

  /** Emits when the embed button is clicked */
  @Output() readonly embedClick = new EventEmitter<void>();

  /** Emits when the contact button is clicked */
  @Output() readonly contactClick = new EventEmitter<void>();

  /** Emits when the hra portal button is clicked */
  @Output() readonly hraPortalClick = new EventEmitter<void>();

  /** Download list popup overlay positioning */
  readonly DOWNLOADS_LIST_POSITION = DOWNLOADS_LIST_POSITION;

  /** Gets whether the footer required is small */
  get isSmall(): boolean {
    return this.size === 'small';
  }

  /** Whether the download list panel is open */
  downloadListOpen = false;
}
