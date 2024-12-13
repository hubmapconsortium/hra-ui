import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SpatialEntityJsonLd } from 'ccf-body-ui';
import { ModelState, ModelStateModel } from '../../core/store/model/model.state';
import { PageState, PageStateModel } from '../../core/store/page/page.state';
import { RegistrationState } from '../../core/store/registration/registration.state';
import { normalizeDoi } from '../../shared/utils/doi';
import {
  MetadataModalComponent,
  MetadataModalConfig,
  MetadataModalMode,
  MetadataModalResult,
} from './modal/metadata-modal.component';

@Injectable({ providedIn: 'root' })
export class MetadataService {
  private readonly dialog = inject(MatDialog);
  private readonly modelState = inject(ModelState);
  private readonly pageState = inject(PageState);
  private readonly registrationState = inject(RegistrationState);

  openModal(mode: MetadataModalMode): void {
    const ref = this.dialog.open<MetadataModalComponent, MetadataModalConfig, MetadataModalResult>(
      MetadataModalComponent,
      {
        width: '100vw',
        maxWidth: '100vw',
        height: '100vh',
        maxHeight: '100vh',
        panelClass: 'metadata-modal',
        hasBackdrop: false,
        autoFocus: false,
        disableClose: mode === 'create',
        data: {
          mode,
          pageSnapshot: mode === 'edit' ? (this.pageState.snapshot as PageStateModel) : undefined,
          modelSnapshot: mode === 'edit' ? (this.modelState.snapshot as ModelStateModel) : undefined,
        },
      },
    );

    ref.afterClosed().subscribe((data) => {
      if (data) {
        this.updateState(mode, data);
      }
    });
  }

  private updateState(_mode: MetadataModalMode, data: MetadataModalResult): void {
    const { modelState, pageState, registrationState } = this;
    const {
      author,
      donor: { organ, sex, consortium, doi },
      previousRegistration,
    } = data;

    if (previousRegistration) {
      registrationState.editRegistration(previousRegistration as SpatialEntityJsonLd);
    }

    pageState.setUserName(author);
    pageState.setEmail(author.email);
    pageState.setOrcidId(author.orcidId);
    pageState.registrationStarted();

    const previousOrgan = modelState.snapshot.organ;
    modelState.setOrgan(organ);
    modelState.setSex(sex);
    modelState.setConsortium(consortium);
    modelState.setDoi(doi && normalizeDoi(doi));
    if (organ !== previousOrgan) {
      modelState.setOrganDefaults();
    }
  }
}
