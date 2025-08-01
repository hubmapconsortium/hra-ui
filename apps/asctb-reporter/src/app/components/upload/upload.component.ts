import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { ButtonSizeDirective } from '@hra-ui/design-system/buttons/button';
import { UploadForm } from '../../models/sheet.model';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { SidenavModule } from '../sidenav/sidenav.module';

@Component({
  selector: 'app-upload',
  imports: [
    CommonModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    SidenavModule,
    MatButtonModule,
    FileUploadComponent,
    MatCardModule,
    MatButtonToggleModule,
    MatMenuModule,
    ButtonSizeDirective,
  ],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  readonly fb = inject(FormBuilder);

  readonly uploadForm = output<UploadForm>();

  formGroup!: FormGroup;
  formValid = true;

  ngOnInit(): void {
    this.formGroup = new FormGroup(
      {
        link: new FormControl('', [
          Validators.required,
          Validators.compose([Validators.pattern(/\/([\w-_]{15,})\/(.*?gid=(\d+))?|\w*csv$/)]) as ValidatorFn,
        ]),
        formData: new FormControl(''),
        fileName: new FormControl(''),
      },
      { validators: [this.fileValidator as ValidatorFn] },
    );

    this.formGroup.valueChanges.subscribe((x) => {
      if (!(x.fileName === null || x.fileName === '')) {
        this.formGroup.get('link')?.clearValidators();
        this.formGroup.get('link')?.updateValueAndValidity({ emitEvent: false });
      }
      this.formValid = this.formGroup.status === 'VALID';
    });
  }

  /**
   * Custom validator to check if either link or fileName is provided
   * @param group Form Group
   * @returns Whether the form is valid or not
   */
  fileValidator(group: FormGroup): { [s: string]: boolean } | null {
    if (group) {
      if (group.controls['link'].value || group.controls['fileName'].value) {
        return null;
      }
    }
    return { error: true };
  }

  /**
   * Handles the file upload event
   * @param fileFormDataEvent FormData event containing the uploaded file
   */
  upload(fileFormDataEvent: FormData) {
    this.formGroup.patchValue({ formData: fileFormDataEvent });
  }

  /**
   * Submits the form data to the parent component
   */
  submitData() {
    this.formValid = this.formGroup.status === 'VALID';
    if (this.formGroup.status !== 'VALID') {
      return;
    }
    const sheet = this.formGroup.value;
    const sheetId = this.checkLinkFormat(sheet.link)?.sheetID ?? '';

    const data: UploadForm = {
      link: sheet.link,
      formData: sheet.formData,
      fileName: sheet.fileName,
      sheetId,
      gid: this.checkLinkFormat(sheet.link)?.gid ?? '',
      csvUrl: this.checkLinkFormat(sheet.link)?.csvUrl ?? '',
    };
    // ga call handled in the playground module component

    this.uploadForm.emit(data);
  }

  /**
   * Checks the format of the provided Google Sheets link
   * @param url URL to check
   * @returns An object containing the sheet ID, GID, and CSV URL
   */
  checkLinkFormat(url: string) {
    if (url.startsWith('https://docs.google.com/spreadsheets/d/')) {
      const splitUrl = url.split('/');
      if (splitUrl.length === 7) {
        return {
          sheetID: splitUrl[5],
          gid: splitUrl[6].split('=')[1],
          csvUrl: '',
        };
      }
    }

    return {
      sheetID: '0',
      gid: '0',
      csvUrl: url,
    };
  }
}
