import { ChangeDetectionStrategy, Component, input } from '@angular/core';
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
})
export class ErrorIndicatorComponent {
  /** List of errors to be shown in the indicator */
  readonly errors = input<string[]>();

  /** Call to action link */
  readonly actionLink = input<string>();

  /** Call to action link label */
  readonly actionLinkLabel = input<string>();
}
