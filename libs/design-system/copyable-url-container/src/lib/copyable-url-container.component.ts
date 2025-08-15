import { Component, inject, input } from '@angular/core';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconsModule } from '@hra-ui/design-system/icons';
import { SnackbarService } from '@hra-ui/design-system/snackbar';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';

/**
 * Contains a url link and a button to copy it to the clipboard.
 */
@Component({
  selector: 'hra-copyable-url-container',
  imports: [ButtonsModule, IconsModule, PlainTooltipDirective],
  templateUrl: './copyable-url-container.component.html',
  styleUrl: './copyable-url-container.component.scss',
})
export class CopyableUrlContainerComponent {
  /** Snackbar service */
  readonly snackbar = inject(SnackbarService);

  /** Url to display */
  readonly url = input.required<string>();

  /**
   * Copys url to clipboard and shows a snackbar notification.
   */
  copyUrl() {
    navigator.clipboard.writeText(this.url());
    this.snackbar.open('Link copied', '', false, 'start', { duration: 5000 });
  }
}
