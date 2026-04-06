import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { RouterExtModule } from '@hra-ui/common/router-ext';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

/**
 * Server Error Page Component
 * - Displays a 500 error page when there is an internal server error.
 */
@Component({
  selector: 'hra-server-error-page',
  imports: [HraCommonModule, ButtonsModule, MatIconModule, RouterExtModule],
  templateUrl: './server-error-page.component.html',
  styleUrl: './server-error-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServerErrorPageComponent {
  /** Link for the report issue CTA */
  readonly reportIssueLink = input.required<string>();
}
