import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ButtonModule } from '@hra-ui/design-system/button';
import { DeleteFileButtonComponent } from '@hra-ui/design-system/delete-file-button';
import { ErrorIndicatorComponent } from '@hra-ui/design-system/error-indicator';
import { StepIndicatorComponent } from '@hra-ui/design-system/step-indicator';
import { WorkflowCardComponent } from '@hra-ui/design-system/workflow-card';

import { JsonFileReaderModule } from '../../../shared/components/json-file-reader/json-file-reader.module';
import { RegistrationFormModule } from '../registration-form/registration-form.module';
import { RegistrationContentComponent } from './registration-content.component';

@NgModule({
  declarations: [RegistrationContentComponent],
  imports: [
    CommonModule,
    MatTooltipModule,
    WorkflowCardComponent,
    StepIndicatorComponent,
    JsonFileReaderModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    ButtonModule,
    DeleteFileButtonComponent,
    ErrorIndicatorComponent,
    MatMenuModule,
    RegistrationFormModule,
  ],
  exports: [RegistrationContentComponent],
})
export class RegistrationContentModule {}
