import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DocumentationContent } from '../info-button/info-button.service';

/**
 * Data model for the dialog input
 */
export interface InfoDialogData {
  /** Content */
  content: DocumentationContent[];
  /** Title */
  title: string;
  /** Video */
  videoID: string;
}

/**
 * This component handles displaying and hiding a full screen modal / overlay that displays information about the project.
 */
@Component({
  selector: 'ccf-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class InfoDialogComponent implements OnInit {
  /** Dialog reference */
  readonly dialogRef = inject<MatDialogRef<InfoDialogComponent>>(MatDialogRef);
  /** Data from parent */
  readonly data = inject<InfoDialogData>(MAT_DIALOG_DATA);

  /**
   * Documentation contents
   */
  documentationContents = this.data.content || [];
  /**
   * Title of the dialog
   */
  infoTitle = this.data.title || '';
  /**
   * URL for video
   */
  videoID = this.data.videoID;

  /**
   * load the youtube player api in on init
   */
  ngOnInit(): void {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }

  /**
   * Closes info dialog component
   */
  close(): void {
    document.getElementsByClassName('modal-animated')[0]?.classList.add('modal-animate-fade-out');

    setTimeout(() => {
      this.dialogRef.close();
    }, 250);
  }
}
