import { ChangeDetectionStrategy, Component, HostBinding, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '@hra-ui/design-system/snackbar';

import { MetaData } from '../../../core/models/meta-data';

/**
 * The expected format of the review modal's data input.
 */
interface ReviewModalData {
  /** The object containing all of the review information for displaying inside the modal */
  metaData: MetaData;

  /** Whether or not the cancel registration callback is set */
  registrationCallbackSet: boolean;
}

/**
 * Modal for reviewing the registration
 */
@Component({
  selector: 'ccf-review-modal',
  templateUrl: './review-modal.component.html',
  styleUrls: ['./review-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ReviewModalComponent {
  /** Dialog reference */
  readonly dialogRef = inject<MatDialogRef<ReviewModalComponent>>(MatDialogRef);
  /** Data */
  readonly data = inject<ReviewModalData>(MAT_DIALOG_DATA);
  /** Snackbar service */
  private readonly snackbar = inject(SnackbarService);

  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-review-modal';

  /**
   * The object containing all of the review information for displaying inside the modal
   */
  readonly metaData = signal<Record<string, MetaData>>({});

  /**
   * Creates an instance of the review modal component.
   */
  constructor() {
    const allData = this.data.metaData;
    this.metaData.set({
      'Author Metadata': allData.slice(0, 5),
      'Donor Metadata': allData.slice(5, 9),
      'Tissue Block Registration': allData.slice(9, 16),
    });
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

  /** Handle download click */
  downloadClicked(): void {
    this.dialogRef.close(true);
    this.snackbar.open('File downloaded', '', false, 'end', { duration: 5000 });
  }
}
