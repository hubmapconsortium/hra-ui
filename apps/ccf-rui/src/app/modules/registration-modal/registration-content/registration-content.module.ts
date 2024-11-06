import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import { RegistrationContentComponent } from './registration-content.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { WorkflowCardComponent } from '@hra-ui/design-system/workflow-card';
import { StepIndicatorComponent } from '@hra-ui/design-system/step-indicator';
import { JsonFileReaderModule } from '../../../shared/components/json-file-reader/json-file-reader.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { ButtonModule } from '@hra-ui/design-system/button';

@NgModule({
  declarations: [RegistrationContentComponent],
  imports: [
    CommonModule,
    MatTooltipModule,
    MatButtonModule,
    MatFormFieldModule,
    WorkflowCardComponent,
    StepIndicatorComponent,
    JsonFileReaderModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    ButtonModule,
  ],
  exports: [RegistrationContentComponent],
})
export class RegistrationContentModule {}
