import { ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
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
  @HostBinding('class')
  @Input()
  size: 'small' | 'large' = 'large';

  /** Input for product logo URL to displayed on the left side. */
  @Input() productLogoUrl = '';

  /** Input for product title to displayed on the left side. */
  @Input() productTitle = '';

  /** Input for Illustration metadata page link in HRA Portal */
  @Input() illustrationMetadata = EMPTY_LINK;

  /** Input for embed link in HRA Portal */
  @Input() embed = EMPTY_LINK;

  /** Different download formats options displayed to the user */
  @Input() downloadFormats: T[] = [];

  /** Emits the selected download format */
  @Output() readonly download = new EventEmitter<T>();

  /** Download list popup overlay positioning */
  readonly DOWNLOADS_LIST_POSITION = DOWNLOADS_LIST_POSITION;

  /** Gets whether the footer required is small */
  get isSmall(): boolean {
    return this.size === 'small';
  }

  /** Whether the download list panel is open */
  downloadListOpen = false;

  /**
   * Ignore if button is clicked, otherwise close the download list panel
   * @param event Mouse event
   */
  handleOutsideClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (['download', 'download\nDownload'].includes(target.innerText)) {
      return;
    } else {
      this.downloadListOpen = false;
    }
  }
}
