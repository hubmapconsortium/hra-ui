import { OverlayModule } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { RichTooltipModule } from '@hra-ui/design-system/tooltips/rich-tooltip';
import { z } from 'zod';

/** Type definition of Title Card */
export type TitleCardSpec = z.infer<typeof TITLE_CARD_DEF>;

/** Title card definition object */
export const TITLE_CARD_DEF = z.object({
  title: z.string(),
  tooltip: z.string(),
});

/** Title card component, renders title, tooltip and contents inside the card */
@Component({
  selector: 'hra-title-card',
  imports: [HraCommonModule, ButtonsModule, MatIconModule, OverlayModule, RichTooltipModule],
  templateUrl: './title-card.component.html',
  styleUrl: './title-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleCardComponent {
  /** Input for title card component */
  readonly spec = input.required<TitleCardSpec>();
}
