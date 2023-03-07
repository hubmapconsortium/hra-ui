import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import { MatListModule } from '@angular/material/list';

/**
 * the interface has different formats for downloading which will be emitted once clicked on Download button

 */
export interface DownloadFormat {
  /**
   * format label type
   */
  label: string;
}

/**
 * cdk overlay positioning to check the download list panel
 * Added two panels for the footer component
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
 * Footer Component
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
   * Input value downloads list position initialized with panel class positions
   */
  readonly DOWNLOADS_LIST_POSITION = DOWNLOADS_LIST_POSITION;

  /**
   * Determines whether download panel is open
   */
  downloadListOpen = false;
}
