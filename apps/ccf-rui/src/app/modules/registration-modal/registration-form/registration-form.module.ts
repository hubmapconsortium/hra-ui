import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ButtonModule } from '@hra-ui/design-system/button';

import { RegistrationFormComponent } from './registration-form.component';

@NgModule({
  declarations: [RegistrationFormComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    ButtonModule,
    MatAutocompleteModule,
  ],
  exports: [RegistrationFormComponent],
})
export class RegistrationFormModule {}
