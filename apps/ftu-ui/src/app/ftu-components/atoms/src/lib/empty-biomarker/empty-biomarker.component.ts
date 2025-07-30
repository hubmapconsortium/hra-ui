import { CdkCopyToClipboard } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SnackbarService } from '@hra-ui/design-system/snackbar';
import { MarkdownModule } from 'ngx-markdown';

/**
 *  Component for any empty biomaker cell
 *  to inform about the empty data and has
 *  button to navigate to HRA Team.
 */
@Component({
  selector: 'ftu-empty-biomarker',
  imports: [CommonModule, MatButtonModule, MarkdownModule, MatIconModule, CdkCopyToClipboard],
  templateUrl: './empty-biomarker.component.html',
  styleUrls: ['./empty-biomarker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyBiomarkerComponent {
  /** Text to display for the empty behavior button */
  readonly emptyBehaviorText = input.required<string>();

  /** Snackbar service */
  private readonly snackbar = inject(SnackbarService);

  /** Shows the copied snackbar message */
  protected showCopiedMessage() {
    this.snackbar.open('Email copied', '');
  }
}
