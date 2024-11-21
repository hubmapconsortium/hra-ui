import { ChangeDetectionStrategy, Component, HostBinding, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SpatialEntityJsonLd } from 'ccf-body-ui';
import { OrganInfo } from 'ccf-shared';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MODEL_DEFAULTS, ModelState, RUI_ORGANS } from '../../../core/store/model/model.state';
import { PageState } from '../../../core/store/page/page.state';
import { RegistrationState } from '../../../core/store/registration/registration.state';

/**
 * Component containing content of the initial registration modal
 */
@Component({
  selector: 'ccf-registration-content',
  templateUrl: './registration-content.component.html',
  styleUrls: ['./registration-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationContentComponent {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-registration-content';

  registrationForm!: FormGroup;

  isValid!: boolean;

  /** Current sex in the model state */
  readonly sexByLabel$ = this.model.sex$.pipe(map((sex) => (sex === 'female' ? 'Female' : 'Male')));

  /** List of selectable organs */
  organList = RUI_ORGANS;

  /** Whether sex has been selected */
  sexSelected!: boolean;

  /** Current organ selected */
  currentOrgan?: OrganInfo;

  /** Checks if the user has entered a first and last name */
  nameValid!: boolean;

  /** Checks if the entered orcid is valid */
  orcidValid!: boolean;

  /** Checks if a preexisting registration was uploaded */
  registrationSelected = false;

  uploadedFileName = '';

  /** Form builder */
  private readonly fb = inject(FormBuilder);

  filteredOrganOptions?: Observable<OrganInfo[]>;

  consortiumList = ['Test', 'Sample', 'Foo', 'SenNet']; // TODO: replace with actual consortium data

  /**
   * Creates an instance of the registration dialog
   *
   * @param page Page state
   * @param model Model state
   * @param dialogRef Registration dialog
   * @param cdr Change detection
   */
  constructor(
    readonly page: PageState,
    readonly model: ModelState,
    readonly registration: RegistrationState,
    public dialogRef: MatDialogRef<RegistrationContentComponent>,
  ) {}

  removeFile() {
    this.registration.patchState({ initialRegistration: undefined });
    this.page.patchState({ user: { firstName: '', lastName: '', email: '' } });
    this.model.setState(MODEL_DEFAULTS);
    this.currentOrgan = undefined;
    this.registrationSelected = false;
  }

  /**
   * Handles button click
   *
   * @param [event] The click event
   * @returns  Returns nothing is no organ is selected
   */
  registerButtonClick(event?: MouseEvent): void {
    if (event) {
      event.preventDefault();
    }
    this.closeDialog();
  }

  handleRegistrationUpload(reg: SpatialEntityJsonLd): void {
    this.registration.editRegistration(reg);
    this.registrationSelected = true;
  }

  /**
   * Closes the dialog and updates page and model states according to form values
   * Sets block to default position and rotation if user didn't select a registration
   * Updates page state to signal registration has started
   */
  closeDialog(): void {
    const { firstName, middleName, lastName, email, orcid, sex } = this.registrationForm.controls;

    // TODO: find out where to update publicationDOI and consortium

    this.page.setUserName({
      firstName: firstName.value ?? '',
      middleName: middleName.value ?? '',
      lastName: lastName.value ?? '',
    });
    this.page.setOrcidId(orcid.value ?? '');
    this.model.setSex(sex.value === 'Female' ? 'female' : 'male');
    this.page.setEmail(email.value ?? '');
    if (this.currentOrgan) {
      this.model.setOrgan(this.currentOrgan);
    }
    if (!this.registrationSelected) {
      this.model.setOrganDefaults();
    }
    this.dialogRef.close(true);
    this.page.registrationStarted();
  }

  setValid(value: boolean) {
    this.isValid = value;
  }

  setOrgan(value: OrganInfo) {
    this.currentOrgan = value;
  }

  setForm(value: FormGroup) {
    this.registrationForm = value;
  }
}
