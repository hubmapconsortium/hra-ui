import { Component, Input, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FileDownloadService } from '../../services/file-download/file-download.service';
import { OrganData } from './two-dim-image';

/** Displays an image and a modal inside a card */
@Component({
  selector: 'ccf-two-dim-image',
  templateUrl: './two-dim-image.component.html',
  styleUrls: ['./two-dim-image.component.scss'],
})
export class TwoDimImageComponent {
  /** Title of the card */
  @Input() cardTitle = '';

  /** Tissue data to be displayed in the cards */
  @Input() tissueData: OrganData[] = [];

  /** Flag to view tissue details in multiple rows */
  @Input() isMultirow = false;

  /** Initializes MatDialog and FileDownloadService */
  constructor(
    private dialog: MatDialog,
    private readonly downloader: FileDownloadService
  ) {}

  /** Opens a modal with image when large screen size */
  openImageViewer(content: TemplateRef<unknown>): void {
    const fontSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    const isSmallScreen = window.innerWidth / fontSize < 63;

    if (!isSmallScreen) {
      this.dialog.open(content, { panelClass: 'two-dim-image-modal' });
    }
  }

  /** Downloads PNG and SVG files */
  downloadClick(event: Event, url: string): void {
    event.preventDefault();
    this.downloader.download(url);
  }
}
