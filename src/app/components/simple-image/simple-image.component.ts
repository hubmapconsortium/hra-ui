import { Component, Input, TemplateRef } from '@angular/core';
import { ImageData } from './simple-image';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'ccf-simple-image',
  templateUrl: './simple-image.component.html',
  styleUrls: ['./simple-image.component.scss']
})
export class SimpleImageComponent {
  @Input() imageInfo: ImageData[] = [];

  constructor(private dialog: MatDialog) { }

  openImageViewer(content: TemplateRef<unknown>): void {
    this.dialog.open(content, { panelClass: 'custom-modal' })
  }
}
