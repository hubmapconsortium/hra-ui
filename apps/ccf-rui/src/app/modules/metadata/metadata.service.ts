import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SpatialEntityJsonLd } from 'ccf-body-ui';

import { AnatomicalStructureTagState } from '../../core/store/anatomical-structure-tags/anatomical-structure-tags.state';
import { ModelState, ModelStateModel } from '../../core/store/model/model.state';
import { PageState, PageStateModel } from '../../core/store/page/page.state';
import { RegistrationState } from '../../core/store/registration/registration.state';
import { SceneState } from '../../core/store/scene/scene.state';
import { normalizeDoi } from '../../shared/utils/doi';
import {
  MetadataModalComponent,
  MetadataModalConfig,
  MetadataModalMode,
  MetadataModalResult,
} from './modal/metadata-modal.component';

/** Service for managing the metadata modal */
@Injectable({ providedIn: 'root' })
export class MetadataService {
  /** Dialog service */
  private readonly dialog = inject(MatDialog);
  /** Anatomical structure tag state */
  private readonly asState = inject(AnatomicalStructureTagState);
  /** Model state */
  private readonly modelState = inject(ModelState);
  /** Page state */
  private readonly pageState = inject(PageState);
  /** Registration state */
  private readonly registrationState = inject(RegistrationState);
  /** Scene state */
  private readonly sceneState = inject(SceneState);

  /**
   * Opens the metadata modal and updates the state when it is closed
   *
   * @param mode Mode to open modal in
   */
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
          pageSnapshot: this.pageState.snapshot as PageStateModel,
          modelSnapshot: this.modelState.snapshot as ModelStateModel,
        },
      },
    );

    ref.afterClosed().subscribe((data) => {
      if (data) {
        this.updateState(mode, data);
      }
    });
  }

  /**
   * Updates the state with the values entered in the metadata modal
   *
   * @param mode Mode modal was opened with
   * @param data Data returned by the modal
   */
  private updateState(mode: MetadataModalMode, data: MetadataModalResult): void {
    const { asState, modelState, pageState, registrationState, sceneState } = this;
    const {
      author,
      donor: { organ, sex, consortium, doi },
      previousRegistration,
    } = data;

    if (mode === 'edit' && (previousRegistration || organ !== modelState.snapshot.organ)) {
      asState.removeAll();
    }

    if (previousRegistration) {
      registrationState.editRegistration(previousRegistration as SpatialEntityJsonLd);
    }

    pageState.setUserName(author);
    pageState.setEmail(author.email);
    pageState.setOrcidId(author.orcidId);
    pageState.registrationStarted();

    // Note: This read must happen after `registrationState.editRegistration`!
    const previousOrgan = modelState.snapshot.organ;
    modelState.setOrgan(organ);
    modelState.setSex(sex);
    modelState.setConsortium(consortium);
    modelState.setDoi(doi && normalizeDoi(doi));
    if (organ !== previousOrgan) {
      modelState.setOrganDefaults();
    }

    sceneState.setDeferCollisions(previousRegistration !== undefined);
  }
}
