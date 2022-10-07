import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrganData } from './two-dim-image';

@Component({
  selector: 'ccf-two-dim-image',
  templateUrl: './two-dim-image.component.html',
  styleUrls: ['./two-dim-image.component.scss']
})
export class TwoDimImageComponent {

  constructor(private dialog: MatDialog) { }

  @Input() cardTitle: string
  @Input() tissueData: OrganData[] = [];
  @Input() isMultirow: boolean;
  @Output() infoRoute = new EventEmitter<OrganData>;

  openImageViewer(content: TemplateRef<unknown>): void {
    this.dialog.open(content, { panelClass: 'two-dim-image-modal' })
  }
}
