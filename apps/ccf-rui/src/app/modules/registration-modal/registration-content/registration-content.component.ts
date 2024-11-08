import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialogRef } from '@angular/material/dialog';
import { SpatialEntityJsonLd } from 'ccf-body-ui';
import { OrganInfo } from 'ccf-shared';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { ModelState, RUI_ORGANS } from '../../../core/store/model/model.state';
import { PageState, Person } from '../../../core/store/page/page.state';
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

  /** Current sex selected */
  currentSex!: string;

  /** Current organ selected */
  currentOrgan!: OrganInfo;

  /** Checks if the user has entered a first and last name */
  nameValid!: boolean;

  /** Checks if the entered orcid is valid */
  orcidValid!: boolean;

  /** Checks if a preexisting registration was uploaded */
  registrationSelected: boolean;

  uploadedFileName = '';

  /** Form builder */
  private readonly fb = inject(FormBuilder);

  readonly registrationForm = this.fb.group({
    firstName: ['', [Validators.required]],
    middleName: [''],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required]],
    orcid: [optionalValue<string>(), [Validators.pattern('^[a-zA-Z0-9]{4}(-[a-zA-Z0-9]{4}){3}$')]],
    sex: ['', [Validators.required]],
    organ: ['', [Validators.required]],
    publicationDOI: [''],
    consortium: [''],
  });

  filteredOptions?: Observable<OrganInfo[]>;

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
    this.registrationSelected = false;

    page.organOptions$.subscribe((options = []) => {
      function _filter(name: string | OrganInfo): OrganInfo[] {
        let filterValue: string | OrganInfo;
        if (typeof name === 'string') {
          filterValue = name.toLowerCase();
        } else {
          filterValue = name.organ;
        }
        return options.filter((option) => option.name.toLowerCase().includes(filterValue));
      }

      this.filteredOptions = this.registrationForm.valueChanges.pipe(
        startWith(''),
        map((value) => {
          const organ = typeof value === 'string' ? value : value?.organ;
          return organ ? _filter(organ as string) : options.slice();
        }),
      );
    });

    page.user$.subscribe((user) => {
      this.checkNameValid(user);
      this.registrationForm.patchValue({ orcid: page.uriToOrcid(user.orcidId) });
      this.orcidValid = page.isOrcidValid();
      cdr.markForCheck();
    });
    model.organ$.subscribe((organ) => {
      this.organSelected = organ.src !== '';
      cdr.markForCheck();
    });
    this.sexByLabel$.subscribe((sex) => {
      this.setSexFromLabel(sex);
      cdr.markForCheck();
    });
    dialogRef.disableClose = true;
    this.page.organOptions$.subscribe((options) => {
      this.organList = options as OrganInfo[];
      cdr.markForCheck();
    });

    registration.state$.subscribe((reg) => {
      if (!reg.initialRegistration) {
        return;
      }
      const { sex, reference_organ } = reg.initialRegistration;
      if (sex) {
        this.registrationForm.patchValue({ sex });
      }
      this.registrationForm.patchValue({ organ: reference_organ });
    });
  }

  removeFile() {
    this.registration.patchState({ initialRegistration: undefined });
    this.registrationSelected = false;
  }

  /**
   * Updates current sex selected
   *
   * @param label Sex selected
   */
  setSexFromLabel(label: 'Female' | 'Male'): void {
    this.model.setSex(label.toLowerCase() as 'male' | 'female');
    this.currentSex = label;
    this.sexSelected = true;
  }

  /**
   * Checks to see if a first and last name has been entered
   *
   * @param event Name input event
   */
  checkNameValid(event: Pick<Person, 'firstName' | 'lastName'>): void {
    this.nameValid = event.firstName.length > 0 && event.lastName.length > 0;
  }

  /**
   * Updates current organ selected
   *
   * @param organ Organ selected
   */
  organSelect(organ: OrganInfo): void {
    this.currentOrgan = organ;
    this.organSelected = true;
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
   * Closes the dialog and sets the correct sex and organ in the model state
   * Sets block to default position and rotation if user didn't select a registration
   * Updates page state to signal registration has started
   */
  closeDialog(): void {
    this.model.setSex(this.currentSex === 'Female' ? 'female' : 'male');
    this.model.setOrgan(this.currentOrgan);
    if (!this.registrationSelected) {
      this.model.setOrganDefaults();
    }
    this.dialogRef.close(true);
    this.page.registrationStarted();
  }

  getErrorMessage(): string {
    return this.registrationForm.controls['orcid'].hasError('pattern') ? 'Not a valid ORCID' : '';
  }

  /**
   * Updates orcid value
   * @param value Orcid value entered
   */
  updateOrcid(value: string): void {
    this.page.setOrcidId(value);
  }

  handleNameChange(): void {
    const { firstName, middleName, lastName } = this.registrationForm.value;
    this.page.setUserName({
      firstName: firstName || '',
      middleName: middleName || '',
      lastName: lastName || '',
    });
    this.checkNameValid({
      firstName: firstName || '',
      lastName: lastName || '',
    });
  }

  displayFn(organ: OrganInfo): string {
    return organ && organ.name ? organ.name : '';
  }

  onSelect(event: MatAutocompleteSelectedEvent): void {
    this.model.setOrgan(event.option.value);
  }
}
