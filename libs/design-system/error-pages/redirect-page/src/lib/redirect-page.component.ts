import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ProgressSpinnerComponent } from '@hra-ui/design-system/indicators/progress-spinner';
import { TextHyperlinkComponent } from '@hra-ui/design-system/buttons/text-hyperlink';

/**
 * Redirect Page Component
 * - Displays a loading page with an indeterminate progress spinner while redirecting
 */
@Component({
  selector: 'hra-redirect-page',
  imports: [ProgressSpinnerComponent, TextHyperlinkComponent],
  templateUrl: './redirect-page.component.html',
  styleUrl: './redirect-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RedirectPageComponent {
  /** URL that the user is being redirected to */
  readonly redirectUrl = input.required<string>();
}
