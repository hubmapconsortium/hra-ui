import '@google/model-viewer';

import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, input, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

import { ViewerCardData } from '../data-viewer.component';
import { FileDownloadService } from '@hra-ui/common/fs';

/**
 * This is a responsive component is used in digital object viewer components. This card design was inspired by YouTube's Thumbnail component.
 */
@Component({
  selector: 'hra-viewer-card',
  imports: [HraCommonModule, MatMenuModule, MatIconModule, MatDividerModule, ButtonsModule],
  templateUrl: './viewer-card.component.html',
  styleUrl: './viewer-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ViewerCardComponent {
  /** Mat dialog service */
  private readonly dialog = inject(MatDialog);

  /** File download service */
  private readonly downloader = inject(FileDownloadService);

  /** All available dropdown options */
  readonly variant = input.required<string>();

  /** Viewer card data */
  readonly viewerCardData = input.required<ViewerCardData>();

  /** Opens a full screen modal for a FTU illustration */
  openImageViewer(content: TemplateRef<unknown>): void {
    this.dialog.open(content, {
      panelClass: 'viewer-card-modal',
      height: '100%',
      width: '100%',
      maxHeight: '100%',
      maxWidth: '100%',
    });
  }

  /** Downloads PNG and SVG files */
  downloadClick(event: Event, url: string): void {
    event.preventDefault();
    this.downloader.download(url);
  }

  /** Closes the full screen modal */
  close(): void {
    this.dialog.closeAll();
  }
}
