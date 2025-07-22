import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { MatIconModule } from '@angular/material/icon';
import { IconsModule } from '@hra-ui/design-system/icons';
import { RouterModule } from '@angular/router';

/**
 * Default publication link for the FTU landing page.
 */
const PUBLICATION_LINK = 'https://doi.org/10.1038/s41467-024-54591-6';

/**
 * Landing Component for the FTU application.
 */
@Component({
  selector: 'ftu-landing',
  imports: [HraCommonModule, ButtonsModule, MatIconModule, IconsModule, RouterModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {
  /**
   * Publication link
   */
  readonly publicationLink = input<string>();

  /**
   * Computed property that returns the publication link or a default value if not provided.
   */
  protected readonly publicationLinkDefault = computed(() => this.publicationLink() ?? PUBLICATION_LINK);
}
