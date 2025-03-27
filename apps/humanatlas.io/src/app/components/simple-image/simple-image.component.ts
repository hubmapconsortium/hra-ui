import { Component, Input, TemplateRef, inject } from '@angular/core';
import { CardHeader, ImageData } from './simple-image';
import { MatDialog } from '@angular/material/dialog';

/** Displays an image and image modal */
@Component({
  selector: 'ccf-simple-image',
  templateUrl: './simple-image.component.html',
  styleUrls: ['./simple-image.component.scss'],
  standalone: false,
})
export class SimpleImageComponent {
  private readonly dialog = inject(MatDialog);

  /** Details to be displayed inside the card */
  @Input() imageInfo: ImageData[] = [];

  /** Details of button and subtitle inside the header section of the card */
  @Input() headerData?: CardHeader;

  /** Custom class for the modal */
  @Input() customModalClass = '';

  /** Opens a modal when clicked on image */
  openImageViewer(content: TemplateRef<unknown>): void {
    const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const isSmallScreen = window.innerWidth / fontSize < 63;
    if (!isSmallScreen) {
      this.dialog.open(content, {
        panelClass: ['custom-modal', this.customModalClass],
      });
    }
  }
}
