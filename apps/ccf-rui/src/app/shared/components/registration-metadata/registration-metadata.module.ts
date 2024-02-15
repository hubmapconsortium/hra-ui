import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { JsonFileReaderModule } from '../json-file-reader/json-file-reader.module';
import { NameInputModule } from '../name-input/name-input.module';
import { RegistrationMetadataComponent } from './registration-metadata.component';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    NameInputModule,
    MatRadioModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatTooltipModule,
    JsonFileReaderModule,
  ],
  declarations: [RegistrationMetadataComponent],
  exports: [RegistrationMetadataComponent],
})
export class RegistrationMetadataModule {}
