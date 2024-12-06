import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SpatialEntityJsonLd } from 'ccf-body-ui';
import { OrganInfo } from 'ccf-shared';

import { MODEL_DEFAULTS, ModelState } from '../../../core/store/model/model.state';
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

  /** Current organ selected */
  currentOrgan?: OrganInfo;

  /** Checks if a preexisting registration was uploaded */
  registrationSelected = false;

  uploadedFileName = '';

  /**
   * Creates an instance of the registration dialog
   *
   * @param page Page state
   * @param model Model state
   * @param dialogRef Registration dialog
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
    const { firstName, middleName, lastName, email, orcid, sex, consortium, publicationDOI } =
      this.registrationForm.controls;

    this.page.setUserName({
      firstName: firstName.value ?? '',
      middleName: middleName.value ?? '',
      lastName: lastName.value ?? '',
    });
    this.page.setOrcidId(orcid.value ?? '');
    this.page.setEmail(email.value ?? '');
    this.model.setSex(sex.value === 'Female' ? 'female' : 'male');
    this.model.setConsortium(consortium.value);
    this.model.setDoi(publicationDOI.value);
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
