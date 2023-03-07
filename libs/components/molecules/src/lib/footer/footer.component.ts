import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import { MatListModule } from '@angular/material/list';

/**
 * Download format interface
 */
export interface DownloadFormat {
  label: string;
}

/**
 * cdk panel list position
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
 * Component
 */
@Component({
  selector: 'hra-footer',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, OverlayModule, MatListModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent<T extends DownloadFormat = DownloadFormat> {
  /**
   * Input  of footer component
   */
  @Input() downloadFormats: T[] = [];

  /**
   * Output  of footer component
   */
  @Output() readonly download = new EventEmitter<T>();

  /**
   * Output  of Illustration
   */
  @Output() readonly IlustrationButtonClick = new EventEmitter();
  /**
   * Output  of Embed
   */
  @Output() readonly EmbedButtonClick = new EventEmitter();
  /**
   * Output  of Contact
   */
  @Output() readonly ContactButtonClick = new EventEmitter();
  /**
   * Output  of HRA Portal
   */
  @Output() readonly HRAPortalButtonClick = new EventEmitter();
  /**
   * Downloads list position
   */
  readonly DOWNLOADS_LIST_POSITION = DOWNLOADS_LIST_POSITION;

  /**
   * Determines whether panel is open
   */
  downloadListOpen = false;
}
