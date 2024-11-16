import { booleanAttribute, Component, HostBinding, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalConfigState } from 'ccf-shared';
import { combineLatest, fromEvent } from 'rxjs';
import { EMPTY_SUBSCRIPTION } from 'rxjs/internal/Subscription';
import { filter, map, startWith, switchAll, take, tap, throttleTime } from 'rxjs/operators';

import { GlobalConfig } from '../../../core/services/config/config';
import { ModelState } from '../../../core/store/model/model.state';
import { PageState } from '../../../core/store/page/page.state';
import { ReferenceDataState } from '../../../core/store/reference-data/reference-data.state';
import {
  DEFAULT_SCREEN_SIZE_NOTICE_STORAGE_KEY,
  SCREEN_SIZE_NOTICE_MAX_HEIGHT,
  SCREEN_SIZE_NOTICE_MAX_WIDTH,
  ScreenSizeNoticeComponent,
} from '../../screen-size-notice/screen-size-notice.component';
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
      })
      .afterOpened()
      .subscribe(() => {
        const initialStorageValue = booleanAttribute(localStorage.getItem(DEFAULT_SCREEN_SIZE_NOTICE_STORAGE_KEY));
        if (initialStorageValue) {
          return EMPTY_SUBSCRIPTION;
        }
        const testScreenSize = () =>
          window.innerWidth < SCREEN_SIZE_NOTICE_MAX_WIDTH || window.innerHeight < SCREEN_SIZE_NOTICE_MAX_HEIGHT;
        const afterClosed$ = fromEvent(window, 'resize').pipe(
          throttleTime(50),
          startWith({}),
          filter(testScreenSize),
          take(1),
          map(() => {
            return this.dialog.open(ScreenSizeNoticeComponent, {
              panelClass: 'screen-size-notice-panel',
              width: '456px',
              disableClose: true,
              closeOnNavigation: false,
            });
          }),
          map((ref) => ref.afterClosed()),
          switchAll(),
        );

        return afterClosed$.subscribe(() => {
          localStorage.setItem(DEFAULT_SCREEN_SIZE_NOTICE_STORAGE_KEY, 'true');
        });
      });
  }
}
