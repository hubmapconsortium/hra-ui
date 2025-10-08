import { Component, OnInit, inject, input, output } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonSizeDirective, ButtonVariantDirective } from '@hra-ui/design-system/buttons/button';
import { ButtonToggleSizeDirective } from '@hra-ui/design-system/buttons/button-toggle';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { Observable } from 'rxjs';
import { CompareData } from '../../models/sheet.model';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { SidenavHeaderComponent } from '../sidenav-header/sidenav-header.component';
import { SidenavModule } from '../sidenav/sidenav.module';

@Component({
  selector: 'app-compare',
  imports: [
    HraCommonModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    SidenavModule,
    SidenavHeaderComponent,
    MatButtonModule,
    FileUploadComponent,
    MatCardModule,
    MatButtonToggleModule,
    ButtonToggleSizeDirective,
    ButtonSizeDirective,
    ButtonVariantDirective,
    MatMenuModule,
    ScrollingModule,
  ],
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss'],
})
export class CompareComponent implements OnInit {
  /** Observable of compare data sheets */
  readonly compareSheets = input.required<Observable<CompareData[]>>();

  /** Close compare event emitter */
  protected readonly closeCompare = output<boolean>();

  /** Compare data event emitter */
  protected readonly compareData = output<CompareData[]>();

  /** Form group for the compare form */
  protected formGroup!: UntypedFormGroup;

  /** Form array for the compare sheets */
  protected formSheets!: UntypedFormArray;

  /** Boolean value indicating whether the form is valid or not */
  protected formValid = true;

  /** FormBuilder instance */
  private readonly fb = inject(UntypedFormBuilder);

  /** Getter for compare sheet controls */
  get CSControls() {
    return this.formGroup.get('sheets') as UntypedFormArray;
  }

  /** Initialize the component */
  ngOnInit(): void {
    this.formGroup = this.fb.group({
      sheets: this.fb.array([]),
    });
    this.formSheets = this.formGroup.get('sheets') as UntypedFormArray;

    this.compareSheets().subscribe((sheets) => {
      if (sheets.length) {
        for (const source of sheets) {
          this.formSheets.push(
            this.createCompareForm(
              source.link,
              source.color,
              source.title,
              source.description,
              source.formData,
              source.fileName,
            ),
          );
        }
      } else {
        this.formSheets.push(this.createCompareForm());
      }
    });

    this.formGroup.valueChanges.subscribe(() => {
      const formArray = this.formGroup.controls['sheets'] as UntypedFormArray;
      formArray.controls.forEach((control) => {
        const sheet = control as UntypedFormGroup;
        const file = sheet.controls['formData'];
        const link = sheet.controls['link'];
        if (file.value != null) {
          link.clearValidators();
          link.updateValueAndValidity({ emitEvent: false });
        }
      });
    });
  }

  /**
   * Upload file event handler
   * @param fileFormDataEvent Form data from the uploaded file
   * @param control The form control to update
   */
  upload(fileFormDataEvent: FormData, control: AbstractControl): void {
    const sheet = control as UntypedFormGroup;
    sheet.controls['formData'].setValue(fileFormDataEvent);
  }

  /**
   * Starts the comparison process if the form is valid
   */
  compare(): void {
    this.markFormGroupTouched(this.formGroup);
    this.formValid = this.formGroup.status === 'VALID';
    if (this.formGroup.status !== 'VALID') {
      return;
    }
    const data: CompareData[] = [];
    for (const [idx, sheet] of this.formGroup.value.sheets.entries()) {
      if (sheet.title === '') {
        sheet.title = `Sheet ${idx + 1}`;
      }

      data.push({
        ...sheet,
        sheetId: this.checkLinkFormat(sheet.link)?.sheetID,
        gid: this.checkLinkFormat(sheet.link)?.gid,
        csvUrl: this.checkLinkFormat(sheet.link)?.csvUrl,
      });
    }

    this.compareData.emit(data);
  }

  /**
   * Adds a new row for comparing additional sheets
   */
  addCompareSheetRow(): void {
    const sheet = this.createCompareForm();
    this.formSheets.push(sheet);
  }

  /**
   * Removes a compare sheet row at the specified index
   * @param i The index of the row to remove
   */
  removeCompareSheetRow(i: number): void {
    this.formSheets.removeAt(i);
  }

  /**
   * Handles data source change for a specific sheet
   * @param idx The index of the sheet to update
   */
  onDataSourceChange(idx: number): void {
    const sheets = this.formGroup.get('sheets') as FormArray;
    const grp = sheets.at(idx) as FormGroup;
    grp.patchValue({ link: '', fileName: '', formData: {} });
  }

  /**
   * Recursively mark all controls in a form group as touched
   * @param formGroup The form group to mark as touched
   */
  private markFormGroupTouched(formGroup: UntypedFormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      const form = control as UntypedFormGroup;
      form.markAsTouched();

      if (form.controls) {
        this.markFormGroupTouched(form);
      }
    });
  }

  /**
   * Checks the format of a Google Sheets link
   * @param url The URL to check
   * @returns An object containing the sheet ID, GID, and CSV URL
   */
  private checkLinkFormat(url: string) {
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

  /**
   * Creates a form group for comparing sheets
   * @param link The Google Sheets link (optional)
   * @param color The color for the sheet (optional)
   * @param title The title of the sheet (optional)
   * @param description The description of the sheet (optional)
   * @param formData The form data for file upload (optional)
   * @param fileName The name of the uploaded file (optional)
   * @returns A form group configured for sheet comparison
   */
  private createCompareForm(
    link = '',
    color?: string,
    title = '',
    description = '',
    formData?: FormData,
    fileName?: string,
  ): UntypedFormGroup {
    if (!color) {
      color = this.getRandomColor();
    }

    return this.fb.group(
      {
        title: [title],
        description: [description],
        link: [
          link,
          Validators.compose([Validators.required, Validators.pattern(/\/([\w-_]{15,})\/(.*?gid=(\d+))?|\w*csv$/)]),
        ],
        color: [color],
        formData: [formData],
        fileName: [fileName],
      },
      { validators: [this.atLeastOnePhoneRequired] },
    );
  }

  /**
   * Custom validator to ensure at least one data source (link or file) is provided
   * @param group The form group to validate
   * @returns Validation error object or null if valid
   */
  private atLeastOnePhoneRequired(group: UntypedFormGroup): { [s: string]: boolean } | null {
    if (group) {
      if (group.controls['link'].value || group.controls['fileName'].value) {
        return null;
      }
    }
    return { error: true };
  }

  /**
   * Generates a random color for sheet identification
   * @returns A random hex color string
   */
  private getRandomColor(): string {
    const letters = '3456789BC'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  }

  doesFormHaveError() {
    (this.formGroup.controls['sheets'].value as UntypedFormGroup[]).forEach((sheet) => {
      // mark as touched for all controls
      sheet.controls['link'].markAsTouched();
    });
    return this.formGroup.status !== 'VALID';
  }
}
