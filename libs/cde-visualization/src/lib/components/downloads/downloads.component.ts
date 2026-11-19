import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Injector,
  input,
  output,
  viewChildren,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { DownloadFileComponent } from './download-file/download-file.component';
import { DOWNLOADS_CONTENT, DownloadRequest, UnavailableDownloads } from './downloads.content';

/** Counter to keep track of distinct instances */
let idCounter = 0;

/**
 * Lists every file available for download. Rendered inside the downloads drawer.
 */
@Component({
  selector: 'cde-downloads',
  imports: [
    HraCommonModule,
    MatIconModule,
    ButtonsModule,
    PlainTooltipDirective,
    ScrollingModule,
    DownloadFileComponent,
  ],
  templateUrl: './downloads.component.html',
  styleUrl: './downloads.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadsComponent {
  /** Emits when the close button is clicked */
  readonly closeClick = output<void>();

  /** Emits when a file download is requested */
  readonly download = output<DownloadRequest>();

  /** Emits when the notice's Show all panels button is clicked */
  readonly showAllPanelsClick = output<void>();

  /** Files that can't be downloaded because they would be empty, or undefined when every file can be */
  readonly unavailable = input<UnavailableDownloads>();

  /** Id attribute for the title, used to label the drawer */
  readonly titleId = `cde-downloads-title-${idCounter}`;

  /** Id attribute for the description, used to describe the drawer */
  readonly descriptionId = `cde-downloads-description-${idCounter}`;

  /** Id attribute for the unavailable files notice */
  readonly unavailableNoticeId = `cde-downloads-unavailable-notice-${idCounter++}`;

  /** Ids of the elements describing the drawer: the description, and the unavailable files notice when it shows */
  readonly describedBy = computed(() =>
    this.unavailable() ? `${this.descriptionId} ${this.unavailableNoticeId}` : this.descriptionId,
  );

  /** Files that are disabled */
  protected readonly disabledFiles = computed(() => new Set(this.unavailable()?.files));

  /** Text content */
  protected readonly content = DOWNLOADS_CONTENT;

  /** File rows, in the order they show */
  private readonly fileRows = viewChildren(DownloadFileComponent);

  /** Injector for the render callback that moves focus */
  private readonly injector = inject(Injector);

  /**
   * Asks to show all panels, then moves focus to the first file that became available,
   * since the notice and its button can go away
   */
  protected showAllPanels(): void {
    const wasDisabled = this.disabledFiles();
    this.showAllPanelsClick.emit();

    afterNextRender(
      () => {
        const isEnabled = (row: DownloadFileComponent) => !this.disabledFiles().has(row.file().id);
        const rows = this.fileRows();
        const row = rows.find((r) => wasDisabled.has(r.file().id) && isEnabled(r)) ?? rows.find(isEnabled);
        row?.focus();
      },
      { injector: this.injector },
    );
  }
}
