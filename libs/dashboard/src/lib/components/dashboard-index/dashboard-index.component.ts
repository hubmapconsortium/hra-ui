import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { z } from 'zod';
import { DashboardComponent, DashboardComponentSpecFor } from '../../dashboard/dashboard.model';
import { LONG_CARD_DEF, LongCardComponent } from '../long-card/long-card.component';

@Component({
  selector: 'hra-dashboard-index',
  standalone: true,
  imports: [CommonModule, LongCardComponent],
  templateUrl: './dashboard-index.component.html',
  styleUrl: './dashboard-index.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardIndexComponent implements DashboardComponent<typeof DashboardIndexComponent> {
  static readonly def = z.object({
    type: z.literal('DashboardIndex'),
    items: LONG_CARD_DEF.extend({
      url: z.string().url(),
    }).array(),
  });

  readonly spec = input.required<DashboardComponentSpecFor<typeof DashboardIndexComponent>>();
}
