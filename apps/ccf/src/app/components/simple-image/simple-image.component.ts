import { Component, Input, TemplateRef } from '@angular/core';
import { ImageData } from './simple-image';
import { MatDialog } from '@angular/material/dialog';

/** Displays an image and image modal */
@Component({
  selector: 'ccf-simple-image',
  templateUrl: './simple-image.component.html',
  styleUrls: ['./simple-image.component.scss'],
})
export class SimpleImageComponent {
  /** Details to be displayed inside the card */
  @Input() imageInfo: ImageData[] = [];

  /** Creates instance of MatDialog */
  constructor(private dialog: MatDialog) {}

  /** Opens a modal when clicked on image */
  openImageViewer(content: TemplateRef<unknown>): void {
    this.dialog.open(content, { panelClass: 'custom-modal' });
  }
}
