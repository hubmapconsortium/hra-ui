import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { dispatch, selectQuerySnapshot } from '@hra-ui/cdk/injectors';
import { ResourceRegistrySelectors as RR, StorageActions, StorageId } from '@hra-ui/cdk/state';
import { ResourceIds, LinkIds } from '@hra-ui/state';
import { ScreenSizeNoticeComponent } from '@hra-ui/components/molecules';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'ftu-ui-screen-notice-behavior',
  standalone: true,
  imports: [CommonModule, ScreenSizeNoticeComponent],
  templateUrl: './screen-notice-behavior.component.html',
  styleUrls: ['./screen-notice-behavior.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenNoticeBehaviorComponent {
  readonly content = selectQuerySnapshot(RR.anyText, ResourceIds.ScreenSizeNoticeContent);

  readonly portal = LinkIds.Portal;

  private readonly ref = inject(MatDialogRef, { optional: true });

  private readonly setScreenNoticeShown = dispatch(StorageActions.Set, StorageId.Local, 'screen-size-notice', 'shown');

  close(): void {
    this.setScreenNoticeShown();
    this.ref?.close();
  }
}
