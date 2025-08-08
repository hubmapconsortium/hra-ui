import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { dispatch, selectQuerySnapshot } from '@hra-ui/cdk/injectors';
import { ResourceRegistrySelectors as RR, StorageActions, StorageId } from '@hra-ui/cdk/state';
import { ResourceIds, LinkIds } from '@hra-ui/state';
import { DialogService } from '@hra-ui/design-system/dialog';
import { MatDialogRef } from '@angular/material/dialog';

/** A component for screen size notice behavior which provides the content to be displayed and provides functionality
 * for the buttons on the notice modal */
@Component({
  selector: 'ftu-ui-screen-notice-behavior',
  imports: [CommonModule],
  template: '',
  styleUrls: ['./screen-notice-behavior.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenNoticeBehaviorComponent implements OnInit {
  /** Content  of screen notice behavior component*/
  readonly content = selectQuerySnapshot(RR.anyText, ResourceIds.ScreenSizeNoticeContent);

  /** Hra portal link routing after clicking on HRA Portal*/
  readonly portal = LinkIds.Portal;

  /** Dialog service instance */
  private readonly dialogService = inject(DialogService);

  /** A dispatcher function that sets the Local Storage as 'shown'*/
  private readonly setScreenNoticeShown = dispatch(StorageActions.Set, StorageId.Local, 'screen-size-notice', 'shown');

  /** Dialog reference */
  private dialogRef?: MatDialogRef<any>;

  ngOnInit(): void {
    this.openScreenNoticeDialog();
  }

  /** Opens the screen notice dialog using the DialogService */
  private openScreenNoticeDialog(): void {
    this.dialogRef = this.dialogService.openNotice('Screen Size Notice', this.content(), {
      label: 'Human Reference Atlas Portal',
      callback: () => this.navigateToPortal(),
    });

    // Handle dialog close
    this.dialogRef.afterClosed().subscribe(() => {
      this.setScreenNoticeShown();
    });
  }

  /** Navigate to HRA Portal */
  private navigateToPortal(): void {
    window.open(this.portal, '_blank');
    this.dialogRef?.close();
  }
}
