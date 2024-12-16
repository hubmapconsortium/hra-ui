import { ChangeDetectionStrategy, Component, input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ButtonModule } from '@hra-ui/design-system/button';
import { NgxMaskDirective } from 'ngx-mask';
import { removeOrcidBaseUrl } from '../../../shared/utils/orcid';

export interface AuthorFormControls {
  firstName: FormControl<string>;
  middleName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  orcidId: FormControl<string>;
}

@Component({
  selector: 'ccf-metadata-author-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, NgxMaskDirective, ButtonModule],
  templateUrl: './metadata-author-form.component.html',
  styleUrls: ['./metadata-author-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataAuthorFormComponent implements OnInit {
  readonly form = input.required<FormGroup<AuthorFormControls>>();

  protected readonly orcidInputFn = (value: unknown) => removeOrcidBaseUrl(String(value).trim());

  ngOnInit(): void {
    setTimeout(() => {
      // Something with ngx-mask is not syncing properly...
      this.form().controls.orcidId.updateValueAndValidity();
    });
  }
}
