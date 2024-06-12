import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, effect, input, viewChild } from '@angular/core';
import embed from 'vega-embed';
import { z } from 'zod';
import { DashboardComponent, DashboardComponentSpecFor } from '../../dashboard/dashboard.model';
import { TITLE_CARD_DEF, TitleCardComponent } from '../title-card/title-card.component';

/** Vega Container Component, embeds a vega lite visualization inside a card */
@Component({
  selector: 'hra-vega-container',
  standalone: true,
  imports: [CommonModule, TitleCardComponent],
  templateUrl: './vega-container.component.html',
  styleUrl: './vega-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VegaContainerComponent implements DashboardComponent<typeof VegaContainerComponent> {
  /** Input definition for vega container component */
  static readonly def = TITLE_CARD_DEF.extend({
    type: z.literal('VegaContainer'),
    specUrl: z.string(),
    aspectRatio: z.string().default('4/3'),
  });

  /** Input for vega container component */
  readonly spec = input.required<DashboardComponentSpecFor<typeof VegaContainerComponent>>();

  /** Reference to the element where visualization is to be embedded */
  protected readonly visRef = viewChild.required<ElementRef>('vis');

  /** Embeds the vega lite visualization to the element */
  protected readonly embedRef = effect(async (onCleanup) => {
    const el = this.visRef().nativeElement;
    const { finalize } = await embed(el, this.spec().specUrl, {
      actions: false,
    });

    onCleanup(finalize);
  });
}
