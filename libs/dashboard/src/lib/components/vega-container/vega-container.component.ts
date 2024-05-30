import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent, DashboardComponentSpecFor } from '../../dashboard/dashboard.model';
import { TITLE_CARD_DEF, TitleCardComponent } from '../title-card/title-card.component';
import { z } from 'zod';

@Component({
  selector: 'hra-vega-container',
  standalone: true,
  imports: [CommonModule, TitleCardComponent],
  templateUrl: './vega-container.component.html',
  styleUrl: './vega-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VegaContainerComponent implements DashboardComponent<typeof VegaContainerComponent> {
  static readonly def = TITLE_CARD_DEF.extend({
    type: z.literal('VegaContainer'),
    specUrl: z.string(),
  });

  readonly spec = input.required<DashboardComponentSpecFor<typeof VegaContainerComponent>>();
}
