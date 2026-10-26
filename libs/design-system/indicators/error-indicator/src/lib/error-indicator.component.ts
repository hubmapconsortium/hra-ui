import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { TextHyperlinkDirective } from '@hra-ui/design-system/buttons/text-hyperlink';

/** Error Indicator component */
@Component({
  selector: 'hra-error-indicator',
  imports: [HraCommonModule, MatIconModule, TextHyperlinkDirective],
  templateUrl: './error-indicator.component.html',
  styleUrl: './error-indicator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': 'announce() ? "alert" : null',
  },
})
export class ErrorIndicatorComponent {
  /** List of errors to be shown in the indicator */
  readonly errors = input<string[]>();

  /** Material icon shown before the errors, such as `warning` for problems that aren't critical */
  readonly icon = input('error');

  /**
   * Whether screen readers announce the errors as soon as they appear. Use it for errors shown after an action,
   * such as a failed upload, but not for messages shown on page load.
   */
  readonly announce = input(false, { transform: booleanAttribute });

  /** Call to action link */
  readonly actionLink = input<string>();

  /** Call to action link label */
  readonly actionLinkLabel = input<string>();
}
