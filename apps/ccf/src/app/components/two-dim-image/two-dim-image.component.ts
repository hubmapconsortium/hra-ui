import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FileDownloadService } from '../../services/file-download/file-download.service';
import { OrganData } from './two-dim-image';

@Component({
  selector: 'ccf-two-dim-image',
  templateUrl: './two-dim-image.component.html',
  styleUrls: ['./two-dim-image.component.scss'],
})
export class TwoDimImageComponent {
  @Input() cardTitle = '';
  @Input() tissueData: OrganData[] = [];
  @Input() isMultirow = false;
  @Output() infoRoute = new EventEmitter<OrganData>();

  constructor(
    private dialog: MatDialog,
    private readonly downloader: FileDownloadService
  ) {}

  openImageViewer(content: TemplateRef<unknown>): void {
    const fontSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    const isSmallScreen = window.innerWidth / fontSize < 63;

    if (!isSmallScreen) {
      this.dialog.open(content, { panelClass: 'two-dim-image-modal' });
    }
  }

  downloadClick(event: Event, url: string): void {
    event.preventDefault();
    this.downloader.download(url);
  }
}
