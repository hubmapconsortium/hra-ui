import { ChangeDetectionStrategy, Component, HostBinding, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
})
export class ReviewModalComponent {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-review-modal';

  /**
   * The object containing all of the review information for displaying inside the modal
   */
  metaData: Record<string, MetaData> = {};

  /**
   * Creates an instance of the review modal component.
   *
   * @param dialogRef A reference to the dialog that this component creates, used to call the dialog's methods
   * @param data Data being injected into the dialog
   */
  constructor(
    public dialogRef: MatDialogRef<ReviewModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReviewModalData,
  ) {
    const allData = data.metaData;
    this.metaData['Author Metadata'] = allData.slice(0, 5);
    this.metaData['Donor Metadata'] = allData.slice(5, 9);
    this.metaData['Tissue Block Registration'] = allData.slice(9, 16);
    console.warn(this.metaData);
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
