import { Component, HostBinding, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalConfigState } from 'ccf-shared';
import { combineLatest } from 'rxjs';
import { tap } from 'rxjs/operators';

import { GlobalConfig } from '../../../core/services/config/config';
import { ModelState } from '../../../core/store/model/model.state';
import { PageState } from '../../../core/store/page/page.state';
import { ReferenceDataState } from '../../../core/store/reference-data/reference-data.state';
import { openScreenSizeNotice } from '../../screen-size-notice/screen-size-notice.component';
import { RegistrationContentComponent } from '../registration-content/registration-content.component';

/**
 * Registration modal that appears on startup
 */
@Component({
  selector: 'ccf-registration-modal',
  styleUrls: ['./registration-modal.component.scss'],
  templateUrl: './registration-modal.component.html',
})
export class RegistrationModalComponent implements OnInit {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-registration-modal';

  /** Checks if registration dialog has been opened */
  dialogOpen = false;

  /**
   * Creates an instance of registration modal component.
   *
   * @param dialog Dialog for the modal
   */
  constructor(
    public dialog: MatDialog,
    private readonly page: PageState,
    private readonly model: ModelState,
    private readonly referenceData: ReferenceDataState,
    private readonly globalConfig: GlobalConfigState<GlobalConfig>,
  ) {}

  /**
   * Opens the dialog on startup (but not if cancel registration callback is set)
   */
  ngOnInit(): void {
    combineLatest([this.page.state$, this.model.state$, this.referenceData.state$, this.globalConfig.state$])
      .pipe(
        tap(([page, model, data, global]) => {
          if (this.dialogOpen) {
            return;
          }
          if (global.editRegistration) {
            return;
          }
          if (Object.keys(data.organIRILookup).length === 0) {
            return;
          }
          if (page.user.firstName !== '' && page.user.lastName !== '' && model.organ.src !== '') {
            return;
          }
          this.dialogOpen = true;
          this.openDialog();
        }),
      )
      .subscribe();
  }

  /**
   * Opens dialog and opens screen size notice panel if necessary
   */
  openDialog(): void {
    this.dialog
      .open(RegistrationContentComponent, {
        autoFocus: false,
        panelClass: 'registration-modal',
        hasBackdrop: false,
        width: '100vw',
        maxWidth: '100vw',
        height: '100vh',
        maxHeight: '100vh',
      })
      .afterOpened()
      .subscribe(() => openScreenSizeNotice(this.dialog));
  }
}
