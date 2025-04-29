import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HraCommonModule } from '@hra-ui/common';

import { SectionCardItem } from './section-cards.schema';

/**
 * Section card that links to another page
 */
@Component({
  selector: 'hra-section-cards',
  imports: [HraCommonModule, RouterModule],
  templateUrl: './section-cards.component.html',
  styleUrl: './section-cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class SectionCardsComponent {
  /** List of card info */
  readonly cardInfo = input.required<SectionCardItem[]>();
}
