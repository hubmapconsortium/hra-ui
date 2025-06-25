import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { MatIconModule } from '@angular/material/icon';
import { IconsModule } from '@hra-ui/design-system/icons';
import { RouterModule } from '@angular/router';

const PUBLICATION_LINK = 'https://doi.org/10.1038/s41467-024-54591-6';

@Component({
  selector: 'ftu-landing',
  imports: [HraCommonModule, ButtonsModule, MatIconModule, IconsModule, RouterModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {
  readonly publicationLink = input<string>();

  protected readonly publicationLinkDefault = computed(() => this.publicationLink() ?? PUBLICATION_LINK);
}
