import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { DownloadFileComponent } from './download-file/download-file.component';
import { DOWNLOADS_CONTENT, DownloadRequest } from './downloads.content';

/** Counter to keep track of distinct instances */
let idCounter = 0;

/**
 * Lists every file available for download. Rendered inside the downloads drawer.
 */
@Component({
  selector: 'cde-downloads',
  imports: [HraCommonModule, MatIconModule, ButtonsModule, PlainTooltipDirective, DownloadFileComponent],
  templateUrl: './downloads.component.html',
  styleUrl: './downloads.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadsComponent {
  /** Emits when the close button is clicked */
  readonly closeClick = output<void>();

  /** Emits when a file download is requested */
  readonly download = output<DownloadRequest>();

  /** Id attribute for the title, used to label the drawer */
  readonly titleId = `cde-downloads-title-${idCounter++}`;

  /** Text content */
  protected readonly content = DOWNLOADS_CONTENT;
}
