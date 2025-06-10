import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { TextHyperlinkDirective } from '@hra-ui/design-system/buttons/text-hyperlink';
import { ActionCardActionComponent, ActionCardComponent } from '@hra-ui/design-system/cards/action-card';
import { FlexContainerComponent } from '@hra-ui/design-system/content-templates/flex-container';

import { LandingPageData } from '../schemas/landing-page/landing-page.schema';

/**
 * HRA documentation landing page component
 */
@Component({
  selector: 'hra-docs-landing-page',
  imports: [
    HraCommonModule,
    FlexContainerComponent,
    ActionCardComponent,
    ActionCardActionComponent,
    TextHyperlinkDirective,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {
  /** Data to display on the landing page */
  readonly data = input.required<LandingPageData>();
}
