import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  inject,
  Output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganInfo } from 'ccf-shared';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { ModelState, RUI_ORGANS } from '../../../core/store/model/model.state';
import { PageState } from '../../../core/store/page/page.state';
import { RegistrationState } from '../../../core/store/registration/registration.state';

/** Returns null for all optional values */
function optionalValue<T>(): T | null {
  return null;
}

@Component({
  selector: 'ccf-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationFormComponent {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-registration-form';

  @Output() readonly registrationFormChange = new EventEmitter<FormGroup>();

  @Output() readonly isValidChange = new EventEmitter<boolean>();

  @Output() readonly organChange = new EventEmitter<OrganInfo>();

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
    cdr: ChangeDetectorRef,
  ) {
    page.user$.pipe(takeUntilDestroyed()).subscribe((user) => {
      this.checkNameValid();
      this.registrationForm.patchValue({ orcid: page.uriToOrcid(user.orcidId) });
      this.orcidValid = page.isOrcidValid();
      cdr.markForCheck();
    });

    this.page.organOptions$.pipe(takeUntilDestroyed()).subscribe((options = []) => {
      this.organList = options as OrganInfo[];

      function _filter(name: string): OrganInfo[] {
        if (typeof name === 'string') {
          const filterValue = name.toLowerCase();
          return options.filter((option) => option.name.toLowerCase().includes(filterValue));
        } else {
          return [];
        }
      }

      this.filteredOrganOptions = this.registrationForm.valueChanges.pipe(
        startWith(''),
        map((value) => {
          const organ = typeof value === 'string' ? value : value?.organ;
          return organ ? _filter(organ) : options.slice();
        }),
      );

      cdr.markForCheck();
    });

    registration.state$.pipe(takeUntilDestroyed()).subscribe((reg) => {
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

    this.registrationForm.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      this.checkOrganSelected();
      this.checkNameValid();
      this.checkSexSelected();
      this.registrationFormChange.emit(this.registrationForm);
      this.isValidChange.emit(this.validData());
      this.organChange.emit(this.currentOrgan);
    });
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
    this.currentOrgan = this.organList.find((organ) => organ.name === organValue);
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

  validData(): boolean {
    return this.organSelected && this.nameValid && this.emailValid() && this.sexSelected && this.orcidValid;
  }
}
