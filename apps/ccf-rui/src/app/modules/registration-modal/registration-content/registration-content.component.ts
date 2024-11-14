import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SpatialEntityJsonLd } from 'ccf-body-ui';
import { OrganInfo } from 'ccf-shared';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { MODEL_DEFAULTS, ModelState, RUI_ORGANS } from '../../../core/store/model/model.state';
import { PageState } from '../../../core/store/page/page.state';
import { RegistrationState } from '../../../core/store/registration/registration.state';

/** Returns null for all optional values */
function optionalValue<T>(): T | null {
  return null;
}

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

  /** Current sex in the model state */
  readonly sexByLabel$ = this.model.sex$.pipe(map((sex) => (sex === 'female' ? 'Female' : 'Male')));

  /** List of selectable organs */
  organList = RUI_ORGANS;

  /** Whether sex has been selected */
  sexSelected!: boolean;

  /** Whether an organ has been selected */
  organSelected!: boolean;

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

  readonly registrationForm = this.fb.group({
    firstName: [''],
    middleName: [''],
    lastName: [''],
    email: ['', [Validators.email]],
    orcid: [optionalValue<string>(), [Validators.pattern('^[a-zA-Z0-9]{4}(-[a-zA-Z0-9]{4}){3}$')]],
    sex: [''],
    organ: [''],
    publicationDOI: [''],
    consortium: [''],
  });

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
    cdr: ChangeDetectorRef,
  ) {
    dialogRef.disableClose = true;
    page.user$.subscribe((user) => {
      this.checkNameValid();
      this.registrationForm.patchValue({ orcid: page.uriToOrcid(user.orcidId) });
      this.orcidValid = page.isOrcidValid();
      cdr.markForCheck();
    });
    this.page.organOptions$.subscribe((options = []) => {
      this.organList = options as OrganInfo[];

      function _filter(name: string | OrganInfo): OrganInfo[] {
        let filterValue: string | OrganInfo;
        if (typeof name === 'string') {
          filterValue = name.toLowerCase();
        } else {
          filterValue = name.organ;
        }
        return options.filter((option) => option.name.toLowerCase().includes(filterValue));
      }

      this.filteredOrganOptions = this.registrationForm.valueChanges.pipe(
        startWith(''),
        map((value) => {
          const organ = typeof value === 'string' ? value : value?.organ;
          return organ ? _filter(organ as string) : options.slice();
        }),
      );

      cdr.markForCheck();
    });

    registration.state$.subscribe((reg) => {
      if (!reg.initialRegistration) {
        this.registrationSelected = false;
        this.registrationForm.reset();
        model.setOrgan({ src: '', name: '', organ: '' });
        return;
      }

      const {
        creator_first_name,
        creator_middle_name,
        creator_last_name,
        creator_email,
        creator_orcid,
        sex,
        reference_organ,
        publication_doi,
        consortium,
      } = reg.initialRegistration;

      this.registrationForm.patchValue({
        firstName: creator_first_name,
        middleName: creator_middle_name,
        lastName: creator_last_name,
        email: creator_email,
        orcid: creator_orcid,
        sex,
        organ: reference_organ,
        publicationDOI: publication_doi,
        consortium,
      });
    });

    this.registrationForm.valueChanges.subscribe(() => {
      this.checkOrganSelected();
      this.checkNameValid();
      this.checkSexSelected();
    });
  }

  removeFile() {
    this.registration.patchState({ initialRegistration: undefined });
    this.page.patchState({ user: { firstName: '', lastName: '', email: '' } });
    this.model.setState(MODEL_DEFAULTS);
    this.currentOrgan = undefined;
  }

  /**
   * Checks to see if a first and last name has been entered
   *
   * @param event Name input event
   */
  checkNameValid(): void {
    this.nameValid =
      !!this.registrationForm.controls['firstName'].value && !!this.registrationForm.controls['lastName'].value;
  }

  checkSexSelected(): void {
    this.sexSelected = !!this.registrationForm.controls['sex'].value;
  }

  checkOrganSelected(): void {
    const organValue = this.registrationForm.controls['organ'].value;
    const organNames = this.organList.map((organ) => organ.name);
    this.organSelected = organValue ? organNames.includes(organValue) : false;
  }

  emailValid(): boolean {
    const emailControl = this.registrationForm.controls['email'];
    return !!emailControl.value && emailControl.value.length > 0 && !emailControl.hasError('email');
  }

  organSelect(organ: OrganInfo): void {
    this.registrationForm.controls['organ'].setValue(organ.name);
    this.currentOrgan = organ;
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
    if (!this.organSelected || !this.nameValid) {
      return;
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
    this.updateEmail(email.value ?? '');
    if (this.currentOrgan) {
      this.model.setOrgan(this.currentOrgan);
    }
    if (!this.registrationSelected) {
      this.model.setOrganDefaults();
    }
    this.dialogRef.close(true);
    this.page.registrationStarted();
  }

  getOrcidErrorMessage(): string {
    return this.registrationForm.controls['orcid'].hasError('pattern') ? 'Not a valid ORCID' : '';
  }

  getEmailErrorMessage(): string {
    return this.emailValid() ? '' : 'Not a valid email';
  }

  /**
   * Updates orcid value
   * @param value Orcid value entered
   */
  updateOrcid(value: string): void {
    this.page.setOrcidId(value);
  }

  updateEmail(value: string): void {
    this.page.setEmail(value);
  }

  displayFn(value: string): string {
    return value ?? '';
  }
}
