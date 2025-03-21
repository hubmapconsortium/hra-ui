import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AssetUrlPipe } from '@hra-ui/cdk/app-href';

import { SectionCardItem } from './section-cards.schema';

/** Test section card items (will replace) */
const testItems: SectionCardItem[] = [
  {
    tagline: 'Join',
    description: 'Register for the monthly Human Reference Atlas Working Group',
    imageSrc: 'assets/images/section-card-images/join.svg',
    route: 'overview-data',
  },
  {
    tagline: 'Data',
    description: 'Research the data constructing Human Reference Atlas',
    imageSrc: 'assets/images/section-card-images/data.svg',
    route: 'ccf-ontology',
  },
  {
    tagline: 'Apps',
    description: 'Construct, visualize, and use Human Reference Atlas applications',
    imageSrc: 'assets/images/section-card-images/apps.svg',
    route: 'overview-tools',
  },
  {
    tagline: 'Training',
    description: 'Check out HuBMAP’s education and engagement efforts',
    imageSrc: 'assets/images/section-card-images/training.svg',
    route: 'overview-training-outreach',
  },
];

/**
 * Section card that links to another page
 */
@Component({
  selector: 'hra-section-cards',
  imports: [CommonModule, AssetUrlPipe, RouterModule],
  templateUrl: './section-cards.component.html',
  styleUrl: './section-cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class SectionCardsComponent {
  /** List of card info */
  readonly cardInfo = input<SectionCardItem[]>(testItems);
}
