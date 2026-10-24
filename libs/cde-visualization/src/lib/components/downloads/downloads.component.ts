import { FocusOrigin } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { DOWNLOADS_CONTENT, DownloadRequest } from './downloads.content';

/** Counter to keep track of distinct instances */
let idCounter = 0;

/**
 * Lists every file available for download. Rendered inside the downloads drawer.
 */
@Component({
  selector: 'cde-downloads',
  imports: [HraCommonModule, MatIconModule, ButtonsModule, PlainTooltipDirective, ScrollingModule],
  templateUrl: './downloads.component.html',
  styleUrl: './downloads.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadsComponent {
  /** Emits the origin of the interaction when the close button is clicked */
  readonly closeClick = output<FocusOrigin>();

  /** Emits when a file download is requested */
  readonly download = output<DownloadRequest>();

  /** Id attribute for the title, used to label the drawer */
  readonly titleId = `cde-downloads-title-${idCounter}`;

  /** Id attribute for the description, used to describe the drawer */
  readonly descriptionId = `cde-downloads-description-${idCounter++}`;

  /** Text content */
  protected readonly content = DOWNLOADS_CONTENT;

  /** Emits a close event with the origin of the click */
  protected close(event: MouseEvent): void {
    // Clicks triggered by the keyboard have no screen coordinates
    const origin = event.screenX === 0 && event.screenY === 0 ? 'keyboard' : 'mouse';
    this.closeClick.emit(origin);
  }
}
