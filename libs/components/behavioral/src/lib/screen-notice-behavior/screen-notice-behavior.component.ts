import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { selectQuerySnapshot } from '@hra-ui/cdk/injectors';
import { ResourceRegistrySelectors as RR } from '@hra-ui/cdk/state';
import { ResourceIds as Ids } from '@hra-ui/state';
import { ScreenSizeNoticeComponent } from '@hra-ui/components/molecules';

@Component({
  selector: 'ftu-ui-screen-notice-behavior',
  standalone: true,
  imports: [CommonModule, ScreenSizeNoticeComponent],
  templateUrl: './screen-notice-behavior.component.html',
  styleUrls: ['./screen-notice-behavior.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenNoticeBehaviorComponent {
  readonly contentUrl = selectQuerySnapshot(RR.url, Ids.ContentUrl);
}
