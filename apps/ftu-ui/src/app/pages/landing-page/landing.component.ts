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
 * Default KPMP link for the FTU landing page.
 */
const KPMP_LINK = 'https://www.kpmp.org/';

/**
 * Default EBI link for the FTU landing page.
 */
const EBI_LINK = 'https://www.ebi.ac.uk/';

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

  /**
   * App link for KPMP.
   */
  readonly appLink1 = input.required<string>();

  /**
   * Computed property that returns the KPMP link.
   */
  protected readonly kpmpLink = computed(() => this.appLink1() ?? KPMP_LINK);

  /**
   * App link for EBI.
   */
  readonly appLink2 = input.required<string>();

  /**
   * Computed property that returns the EBI link.
   */
  protected readonly ebiLink = computed(() => this.appLink1() ?? EBI_LINK);
}
