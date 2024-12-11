import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { JsonFileLoaderService } from '@hra-ui/common/fs';
import { ButtonModule } from '@hra-ui/design-system/button';
import { ErrorIndicatorComponent } from '@hra-ui/design-system/error-indicator';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { WorkflowCardV2Module } from '@hra-ui/design-system/workflow-card';
import { SpatialEntityJsonLd } from 'ccf-body-ui';
import { OrganInfo } from 'ccf-shared';
import { ModelStateModel } from '../../../core/store/model/model.state';
import { PageStateModel, Person } from '../../../core/store/page/page.state';
import { ReferenceDataState } from '../../../core/store/reference-data/reference-data.state';
import { FileLoadError, FileUploadComponent } from '../../../shared/components/file-upload/file-upload.component';
import { MetadataAuthorFormComponent } from '../author-form/metadata-author-form.component';
import { MetadataConfirmationDialogComponent } from '../confirmation-dialog/metadata-confirmation-dialog.component';
import { MetadataDonorFormComponent } from '../donor-form/metadata-donor-form.component';
import { MetadataHelpComponent } from '../help/metadata-help.component';

export type MetadataModalMode = 'create' | 'edit';

export interface MetadataModalConfig {
  mode: MetadataModalMode;
  pageSnapshot?: PageStateModel;
  modelSnapshot?: ModelStateModel;
}

export interface MetadataModalResult {
  author: Person;
  donor: Pick<ModelStateModel, 'organ' | 'sex' | 'consortium' | 'doi'>;
  previousRegistration?: Partial<SpatialEntityJsonLd>;
}

@Component({
  selector: 'ccf-metadata-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    ButtonModule,
    ErrorIndicatorComponent,
    ScrollingModule,
    WorkflowCardV2Module,
    FileUploadComponent,
    MetadataAuthorFormComponent,
    MetadataDonorFormComponent,
    MetadataHelpComponent,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        subscriptSizing: 'dynamic',
      } satisfies MatFormFieldDefaultOptions,
    },
  ],
  templateUrl: './metadata-modal.component.html',
  styleUrls: ['./metadata-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataModalComponent {
  protected readonly config = inject<MetadataModalConfig>(MAT_DIALOG_DATA);
  private readonly dialog = inject(MatDialog);
  private readonly ref = inject<MatDialogRef<MetadataModalComponent, MetadataModalResult>>(MatDialogRef);
  private readonly referenceState = inject(ReferenceDataState);

  private readonly nnfb = inject(NonNullableFormBuilder);
  protected readonly metadataForm = this.nnfb.group({
    author: this.nnfb.group({
      firstName: ['', [Validators.required]],
      middleName: [''],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.email]],
      orcidId: [''],
    }),

    donor: this.nnfb.group({
      organ: new FormControl<OrganInfo | string | null>(null, [Validators.required]),
      sex: ['', [Validators.required]],
      consortium: [''],
      doi: [''],
    }),
  });

  protected readonly fileLoader = JsonFileLoaderService;
  protected fileErrors?: string[] = undefined;
  protected previousRegistration?: Partial<SpatialEntityJsonLd> = undefined;

  constructor() {
    this.metadataForm.patchValue({
      author: this.config.pageSnapshot?.user,
      donor: this.config.modelSnapshot,
    });
  }

  setPreviousRegistration(obj: unknown): void {
    if (typeof obj === 'object' && obj) {
      const {
        creator_first_name: firstName,
        creator_middle_name: middleName,
        creator_last_name: lastName,
        creator_email: email,
        creator_orcid: orcidId,
        placement,
        consortium,
        publication_doi: doi,
      } = (this.previousRegistration = obj as Partial<SpatialEntityJsonLd>);
      const iri = Array.isArray(placement) ? placement[0].target : placement?.target;
      const data = iri ? this.referenceState.getOrganData(iri) : undefined;

      this.metadataForm.reset({
        author: { firstName, middleName, lastName, email, orcidId },
        donor: { organ: data?.organ, sex: data?.sex, consortium, doi },
      });
    }
  }

  setFileErrors(cause: FileLoadError): void {
    if (cause.type === 'type-error') {
      this.fileErrors = ['File format not supported: Please upload a JSON file.'];
    } else if (cause.cause instanceof Error) {
      const msg = cause.cause.message;
      const line = /line (\d+)/i.exec(msg)?.[1] ?? '?';
      const column = /column (\d+)/i.exec(msg)?.[1] ?? '?';
      this.fileErrors = [`Error in JSON at line ${line} column ${column}:`, 'Please upload a file with valid JSON.'];
    }
  }

  clearPreviousRegistration(): void {
    this.fileErrors = undefined;
    this.previousRegistration = undefined;
    this.metadataForm.reset();
  }

  submit(): void {
    if (this.config.mode === 'edit' && this.hasOrganChange()) {
      const ref = this.dialog.open<MetadataConfirmationDialogComponent, void, boolean>(
        MetadataConfirmationDialogComponent,
        {
          width: '456px',
          panelClass: 'metadata-confirmation-modal',
        },
      );

      ref.beforeClosed().subscribe((update) => {
        if (update) {
          this.submitResult();
        }
      });
    } else {
      this.submitResult();
    }
  }

  private hasOrganChange(): boolean {
    const previousOrgan = this.config.modelSnapshot?.organ;
    const organControl = this.metadataForm.get(['donor', 'organ'] as const);
    return previousOrgan !== undefined && organControl?.value !== previousOrgan;
  }

  private submitResult(): void {
    this.ref.close({
      ...this.metadataForm.value,
      previousRegistration: this.previousRegistration,
    } as MetadataModalResult);
  }
}
