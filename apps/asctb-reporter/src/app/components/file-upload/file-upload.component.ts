import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonSizeDirective } from '@hra-ui/design-system/buttons/button';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    FontAwesomeModule,
    ButtonSizeDirective,
  ],

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: FileUploadComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: FileUploadComponent,
    },
  ],
})
export class FileUploadComponent implements ControlValueAccessor, Validator {
  fileName = '';

  @Output() readonly fileFormDataEvent = new EventEmitter<FormData>();

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement | null)?.files?.[0];

    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('csvFile', file);
      this.fileFormDataEvent.emit(formData);
      this.onChange(this.fileName);
    }
  }

  onFileRemove(fileUpload: HTMLInputElement) {
    fileUpload.value = '';
    this.fileName = '';
    this.fileFormDataEvent.emit();
    this.onChange(this.fileName);
  }

  fileUploadError = false;

  onChange: (fileName: string) => void = () => {
    // Intentionally empty
  };

  onTouched = () => {
    // Intentionally empty
  };

  onValidatorChange = () => {
    // Intentionally empty
  };

  onClick(fileUpload: HTMLInputElement) {
    this.onTouched();
    fileUpload.click();
  }

  writeValue(value: string) {
    this.fileName = value;
  }

  registerOnChange(onChange: (value: string) => void) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void) {
    this.onTouched = onTouched;
  }

  registerOnValidatorChange(onValidatorChange: () => void) {
    this.onValidatorChange = onValidatorChange;
  }

  validate(): ValidationErrors | null {
    return null;
  }
}
