import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { JsonFileLoaderService } from '@hra-ui/common/fs';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ErrorIndicatorComponent } from '@hra-ui/design-system/error-indicator';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { WorkflowCardModule } from '@hra-ui/design-system/workflow-card';
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

/** Modal mode */
export type MetadataModalMode = 'create' | 'edit';

/** Modal initial configuration */
export interface MetadataModalConfig {
  /** Mode */
  mode: MetadataModalMode;
  /** Initial page state */
  pageSnapshot: PageStateModel;
  /** Initial model state */
  modelSnapshot: ModelStateModel;
}

/** Result returned by the modal */
export interface MetadataModalResult {
  /** Author data */
  author: Person;
  /** Donor data */
  donor: Pick<ModelStateModel, 'organ' | 'sex' | 'consortium' | 'doi'>;
  /** Previous registration */
  previousRegistration?: Partial<SpatialEntityJsonLd>;
}

/** Metadata modal form */
@Component({
  selector: 'ccf-metadata-modal',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    ButtonsModule,
    ErrorIndicatorComponent,
    ScrollingModule,
    WorkflowCardModule,
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
  /** Initial configuration */
  protected readonly config = inject<MetadataModalConfig>(MAT_DIALOG_DATA);
  /** Dialog service */
  private readonly dialog = inject(MatDialog);
  /** Reference to container dialog */
  private readonly ref = inject<MatDialogRef<MetadataModalComponent, MetadataModalResult>>(MatDialogRef);
  /** Reference data state */
  private readonly referenceState = inject(ReferenceDataState);

  /** Non-nullable form builder */
  private readonly nnfb = inject(NonNullableFormBuilder);
  /** Main metadata form */
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

  /** Service used to load previous registration files */
  protected readonly fileLoader = JsonFileLoaderService;
  /** Errors during file loading */
  protected fileErrors?: string[] = undefined;
  /** Previous registration data */
  protected previousRegistration?: Partial<SpatialEntityJsonLd> = undefined;

  /** Initialize the form field from the configuration */
  constructor() {
    const { mode, pageSnapshot, modelSnapshot } = this.config;
    const author = pageSnapshot.user;
    const donor: Partial<ModelStateModel> = { ...modelSnapshot };
    if (mode === 'create' && !modelSnapshot.organ.name) {
      delete donor.organ;
      delete donor.sex;
    }

    this.metadataForm.patchValue({ author, donor });
  }

  /**
   * Populate the form from a registration file's content
   *
   * @param obj Registration file content
   */
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
      this.metadataForm.markAsDirty();
    }
  }

  /**
   * Set error descriptions based on the file loading error
   *
   * @param cause File error data
   */
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

  /** Clears the form when the previous registration file is removed */
  clearPreviousRegistration(): void {
    this.fileErrors = undefined;
    this.previousRegistration = undefined;
    this.metadataForm.reset();
  }

  /** Submit the form data to the opener and closes the metadata form */
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

  /**
   * Checks whether the user has changed the organ field
   *
   * @returns Whether the user has selected a different organ
   */
  private hasOrganChange(): boolean {
    const previousOrgan = this.config.modelSnapshot?.organ;
    const organControl = this.metadataForm.get(['donor', 'organ'] as const);
    return previousOrgan !== undefined && organControl?.value !== previousOrgan;
  }

  /** Closes the metadata form and passes the selected form data to the opener */
  private submitResult(): void {
    this.ref.close({
      ...this.metadataForm.value,
      previousRegistration: this.previousRegistration,
    } as MetadataModalResult);
  }
}
