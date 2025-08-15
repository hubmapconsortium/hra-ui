import { Component, inject, input } from '@angular/core';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconsModule } from '@hra-ui/design-system/icons';
import { SnackbarService } from '@hra-ui/design-system/snackbar';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';

/**
 * Contains a PURL link and a button to copy it to the clipboard.
 */
@Component({
  selector: 'hra-purl-container',
  imports: [ButtonsModule, IconsModule, PlainTooltipDirective],
  templateUrl: './purl-container.component.html',
  styleUrl: './purl-container.component.scss',
})
export class PurlContainerComponent {
  /** Snackbar service */
  readonly snackbar = inject(SnackbarService);

  /** PURL to display */
  readonly purl = input.required<string>();

  /**
   * Copys purl to clipboard and shows a snackbar notification.
   */
  copyPurl() {
    navigator.clipboard.writeText(this.purl());
    this.snackbar.open('Link copied', '', false, 'start', { duration: 5000 });
  }
}
