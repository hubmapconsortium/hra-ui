import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FragmentLinkDirective } from '@hra-ui/common/router-ext';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

/**
 * "Skip to content" button component for accessibility,
 * allowing users to quickly navigate to the main content of the page.
 */
@Component({
  selector: 'hra-skip-to-content-button',
  imports: [ButtonsModule, FragmentLinkDirective],
  templateUrl: './skip-to-content-button.component.html',
  styleUrl: './skip-to-content-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkipToContentButtonComponent {
  /** The ID of the anchor element to skip to. */
  readonly anchorId = input.required<string>();

  /** The label for the button. */
  readonly label = input('Skip to main content');
}
