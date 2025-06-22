import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { MatIconModule } from '@angular/material/icon';
import { IconsModule } from '@hra-ui/design-system/icons';
import { RouterModule } from '@angular/router';

const EXPLORE_FTU_LINK =
  'https://apps.humanatlas.io/ftu-explorer/#/ftu?id=https:%2F%2Fpurl.humanatlas.io%2F2d-ftu%2Fkidney-ascending-thin-loop-of-henle';

const PUBLICATION_LINK = 'https://doi.org/10.1038/s41467-024-54591-6';

@Component({
  selector: 'ftu-landing',
  imports: [HraCommonModule, ButtonsModule, MatIconModule, IconsModule, RouterModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {
  readonly exampleFtuId = input.required<string>(); // Set in route data 'https://purl.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle';

  protected readonly exploreLink = EXPLORE_FTU_LINK;

  readonly publicationLink = input<string>();

  protected readonly publicationLinkDefault = computed(() => this.publicationLink() ?? PUBLICATION_LINK);
}
