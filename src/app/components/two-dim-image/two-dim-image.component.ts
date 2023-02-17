import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FileDownloadService } from '../../services/file-download/file-download.service';
import { OrganData } from './two-dim-image';

@Component({
  selector: 'ccf-two-dim-image',
  templateUrl: './two-dim-image.component.html',
  styleUrls: ['./two-dim-image.component.scss']
})
export class TwoDimImageComponent {
  @Input() cardTitle: string;

  @Input() tissueData: OrganData[] = [];

  @Input() isMultirow: boolean;
  
  @Output() infoRoute = new EventEmitter<OrganData>;
  
  constructor(private dialog: MatDialog, private readonly downloader: FileDownloadService) { }

  openImageViewer(content: TemplateRef<unknown>): void {
    this.dialog.open(content, { panelClass: 'two-dim-image-modal' })
  }

  downloadClick(event: Event, url: string): void {
    event.preventDefault();
    this.downloader.download(url);
  }
}
