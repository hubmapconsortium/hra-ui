import { ChangeDetectionStrategy, Component, input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { NgxMaskDirective } from 'ngx-mask';

import { removeOrcidBaseUrl } from '../../../shared/utils/orcid';

/**
 * Form controls for the author form
 */
export interface AuthorFormControls {
  /** First name of author */
  firstName: FormControl<string>;
  /** Middle name of author */
  middleName: FormControl<string>;
  /** Last name of author */
  lastName: FormControl<string>;
  /** Email of author */
  email: FormControl<string>;
  /** Orcid ID of author */
  orcidId: FormControl<string>;
}

/**
 * Form for author info
 */
@Component({
  selector: 'ccf-metadata-author-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, NgxMaskDirective, ButtonsModule],
  templateUrl: './metadata-author-form.component.html',
  styleUrls: ['./metadata-author-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataAuthorFormComponent implements OnInit {
  /** Author input form */
  readonly form = input.required<FormGroup<AuthorFormControls>>();

  /** Removes base url from orcid id input  */
  protected readonly orcidInputFn = (value: unknown) => removeOrcidBaseUrl(String(value).trim());

  /**
   * On init, updates the value and validation status of the orcicId form control.
   */
  ngOnInit(): void {
    setTimeout(() => {
      // Something with ngx-mask is not syncing properly...
      this.form().controls.orcidId.updateValueAndValidity();
    });
  }
}
