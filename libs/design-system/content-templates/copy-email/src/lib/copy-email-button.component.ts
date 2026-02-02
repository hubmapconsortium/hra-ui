import { CdkCopyToClipboard } from '@angular/cdk/clipboard';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { SnackbarService } from '@hra-ui/design-system/snackbar';

/**
 * Copy email button component that copies given email ID to clipboard on click.
 */
@Component({
  selector: 'hra-copy-email-button',
  imports: [MatIconModule, MatMenuModule, MatButtonModule, CdkCopyToClipboard],
  templateUrl: './copy-email-button.component.html',
  styleUrl: './copy-email-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CopyEmailButtonComponent {
  /** Email Id */
  readonly emailId = input.required<string>();

  /** Snackbar service */
  private readonly snackbar = inject(SnackbarService);

  /** Trigerred when user clicks on the Copy button */
  openCopiedSnackbar() {
    this.snackbar.open('Copied to clipboard', '', false, 'start', { duration: 5000 });
  }
}
