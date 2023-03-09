import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import { MatListModule } from '@angular/material/list';

/**
 * An interface has different download formats for list panel which will be emitted once clicked on Download button.

 */
export interface DownloadFormat {
  /**
   * The format type that can be downloaded when clicked on download list panel
   */
  label: string;
}

/**
 * A constant that has two arrays of objects for download list panel positioning according to footer component placement
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
  imports: [CommonModule, MatButtonModule, MatIconModule, OverlayModule, MatListModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent<T extends DownloadFormat = DownloadFormat> {
  /**
   * Input  of different download format for download button
   */
  @Input() downloadFormats: T[] = [];

  /**
   * Output emits download format when clicked on download list panel
   */
  @Output() readonly download = new EventEmitter<T>();

  /**
   * Output emits link when clicked on Illustration button
   */
  @Output() readonly illustrationClick = new EventEmitter<void>();
  /**
   * Output emits link when clicked on Embed button
   */
  @Output() readonly embedClick = new EventEmitter<void>();
  /**
   * Output emits contact component when clicked on Contact button
   */
  @Output() readonly contactClick = new EventEmitter<void>();
  /**
   * Output emits link when clicked on HRA Portal butoon
   */
  @Output() readonly hraPortalClick = new EventEmitter<void>();
  /**
   * Download list positioning settings
   */
  readonly DOWNLOADS_LIST_POSITION = DOWNLOADS_LIST_POSITION;

  /**
   * A boolean input property that determines whether download panel is open or closed
   */
  downloadListOpen = false;
}
