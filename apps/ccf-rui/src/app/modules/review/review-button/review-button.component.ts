import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  Output,
  inject,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MetaData } from '../../../core/models/meta-data';
import { PageState } from '../../../core/store/page/page.state';
import { ReviewModalComponent } from '../review-modal/review-modal.component';

/**
 * Component to launch the ReviewModal component.
 */
@Component({
  selector: 'ccf-review-button',
  templateUrl: './review-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ReviewButtonComponent implements OnChanges {
  /** Dialog service */
  private readonly dialog = inject(MatDialog);
  /** Page state */
  readonly page = inject(PageState);

  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-review-button';

  /**
   * Input to set whether the component should be in register (true) or download (false) mode
   */
  @Input() registrationCallbackSet = true;

  /**
   * Input object of information to display in the modal
   */
  @Input() metaData: MetaData = [];

  /**
   * Whether or not the app is currently displaying errors
   * Decides how the button should be styled
   */
  @Input() displayErrors = true;

  /**
   * Whether or not all the necessary data has been inputted from the user.
   */
  @Input() userValid = false;

  /**
   * Output that emits when the modal's register button was clicked
   */
  @Output() readonly registerData = new EventEmitter<void>();

  /**
   * Turns on the 'error mode' for the application.
   * Used to begin showing the user what they need to
   * do to be able to register / download.
   */
  @Output() readonly enterErrorMode = new EventEmitter<void>();

  /**
   * Decides whether or not to let the user open the registration / download modal
   */
  registrationIsValid = false;

  /** Tooltip for the button */
  get tooltip(): string {
    return this.disabled
      ? 'Tissue block does not collide with any anatomical structures'
      : 'Review registration and submit/download.';
  }

  /**
   * Updates the value of registrationIsValid based on the
   * meta data.
   */
  ngOnChanges(): void {
    const organ = this.metaDataLookup('Reference Organ Name');
    const dimensions = this.metaDataLookup('Tissue Block Dimensions (mm)');
    const pos = this.metaDataLookup('Tissue Block Position (mm)');
    const tags = this.metaDataLookup('Anatomical Structure Tags');
    this.registrationIsValid = this.userValid && [organ, dimensions, pos, tags].every((value) => value !== '');
  }

  /**
   * Decides whether or not the download / register button should
   * be disabled.
   */
  get disabled(): boolean {
    return !this.registrationIsValid;
  }

  /**
   * Gets value from metadata field
   * @param field Name of field
   * @returns Metadata value
   */
  private metaDataLookup(field: string): string | undefined {
    return this.metaData.find((data) => data.label === field)?.value;
  }

  /**
   * Handles the click action for the register button.
   */
  registerButtonClick(event?: MouseEvent): false {
    if (event) {
      event.preventDefault();
    }
    this.enterErrorMode.emit();
    if (this.registrationIsValid) {
      this.launchReviewModal();
    }
    return false;
  }

  /**
   * Opens the info dialogue with the project details
   */
  launchReviewModal(): void {
    this.page.patchState({ registrationStarted: false });
    const dialogRef = this.dialog.open(ReviewModalComponent, {
      panelClass: 'modal-animated',
      minWidth: '40rem',
      maxWidth: '40rem',
      data: {
        registrationCallbackSet: this.registrationCallbackSet,
        metaData: this.metaData,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      this.page.registrationStarted();
      if (data) {
        this.registerData.emit();
      }
    });
  }
}
