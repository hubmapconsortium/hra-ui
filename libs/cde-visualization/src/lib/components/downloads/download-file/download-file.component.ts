import { ChangeDetectionStrategy, Component, ElementRef, inject, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { DownloadFileContent, DownloadFormat } from '../downloads.content';

/**
 * A downloadable file with a download button for each of its formats
 */
@Component({
  selector: 'cde-download-file',
  imports: [HraCommonModule, MatIconModule, ButtonsModule],
  templateUrl: './download-file.component.html',
  styleUrl: './download-file.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadFileComponent {
  /** File to show */
  readonly file = input.required<DownloadFileContent>();

  /** Whether the file can't be downloaded, which disables its format buttons */
  readonly disabled = input(false);

  /** Emits the format to download when a format button is clicked */
  readonly download = output<DownloadFormat>();

  /** Host element */
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);

  /** Focuses the first format button */
  focus(): void {
    this.el.nativeElement.querySelector('button')?.focus();
  }
}
