import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HraCommonModule } from '@hra-ui/common';
import { TextHyperlinkDirective } from '@hra-ui/design-system/buttons/text-hyperlink';
import { ActionCardActionComponent, ActionCardComponent } from '@hra-ui/design-system/cards/action-card';
import { GridContainerComponent } from '@hra-ui/design-system/content-templates/grid-container';
import { SectionCardItem } from './section-cards.schema';

/**
 * Section card that links to another page
 */
@Component({
  selector: 'hra-section-cards',
  imports: [
    HraCommonModule,
    RouterModule,
    ActionCardComponent,
    ActionCardActionComponent,
    TextHyperlinkDirective,
    GridContainerComponent,
  ],
  templateUrl: './section-cards.component.html',
  styleUrl: './section-cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionCardsComponent {
  /** List of card info */
  readonly cardInfo = input.required<SectionCardItem[]>();
}
