import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ContentTemplateOutletDirective } from '@hra-ui/cdk/content-template';
import { HraCommonModule } from '@hra-ui/common';
import { GridContainerComponent } from '@hra-ui/design-system/content-templates/grid-container';
import { NavigationModule } from '@hra-ui/design-system/navigation';

import { LandingPageData } from '../schemas/landing-page/landing-page.schema';

/**
 * HRA documentation landing page component
 */
@Component({
  selector: 'hra-docs-landing-page',
  imports: [ContentTemplateOutletDirective, GridContainerComponent, HraCommonModule, NavigationModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {
  /** Data to display on the landing page */
  readonly data = input.required<LandingPageData>();
}
