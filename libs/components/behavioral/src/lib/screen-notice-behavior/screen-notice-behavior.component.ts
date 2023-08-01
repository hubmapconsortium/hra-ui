import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { dispatch, selectQuerySnapshot } from '@hra-ui/cdk/injectors';
import { ResourceRegistrySelectors as RR, StorageActions, StorageId } from '@hra-ui/cdk/state';
import { ResourceIds, LinkIds } from '@hra-ui/state';
import { ScreenSizeNoticeComponent } from '@hra-ui/components/molecules';
import { MatDialogRef } from '@angular/material/dialog';

/** A component for screen size notice behavior which provides the content to be displayed and provides functionality
 * for the buttons on the notice modal */
@Component({
  selector: 'ftu-ui-screen-notice-behavior',
  standalone: true,
  imports: [CommonModule, ScreenSizeNoticeComponent],
  templateUrl: './screen-notice-behavior.component.html',
  styleUrls: ['./screen-notice-behavior.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenNoticeBehaviorComponent {
  /** Content  of screen notice behavior component*/
  readonly content = selectQuerySnapshot(RR.anyText, ResourceIds.ScreenSizeNoticeContent);

  /** Hra portal link routing after clicking on HRA Portal*/
  readonly portal = LinkIds.Portal;

  /** Reference for the screen size notice dialog box*/
  private readonly ref = inject(MatDialogRef, { optional: true });

  /** A dispatcher function that sets the Local Storage as 'shown'*/
  private readonly setScreenNoticeShown = dispatch(StorageActions.Set, StorageId.Local, 'screen-size-notice', 'shown');

  /** A function which closes the screen size notice dialog box*/
  close(): void {
    this.setScreenNoticeShown();
    this.ref?.close();
  }
}
