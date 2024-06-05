import { ChangeDetectionStrategy, Component, ElementRef, effect, input, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent, DashboardComponentSpecFor } from '../../dashboard/dashboard.model';
import { TITLE_CARD_DEF, TitleCardComponent } from '../title-card/title-card.component';
import { z } from 'zod';
import embed from 'vega-embed';
import { View } from 'vega';

@Component({
  selector: 'hra-vega-container',
  standalone: true,
  imports: [CommonModule, TitleCardComponent],
  templateUrl: './vega-container.component.html',
  styleUrl: './vega-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VegaContainerComponent implements DashboardComponent<typeof VegaContainerComponent> {
  private readonly visRef = viewChild<ElementRef>('vis');
  private readonly view = signal<View | undefined>(undefined);

  static readonly def = TITLE_CARD_DEF.extend({
    type: z.literal('VegaContainer'),
    specUrl: z.string(),
    aspectRatio: z.string().default('4/3'),
  });

  readonly spec = input.required<DashboardComponentSpecFor<typeof VegaContainerComponent>>();

  constructor() {
    this.embedVegaChart();
  }

  private embedVegaChart(): void {
    effect(async (onCleanup) => {
      const el = this.visRef()?.nativeElement;
      const { finalize, view } = await embed(el, this.spec().specUrl, {
        actions: false,
        patch: [
          { op: 'add', path: '/autosize/type', value: 'fit' },
          { op: 'add', path: '/width', value: 'container' },
          { op: 'add', path: '/height', value: 'container' },
          { op: 'add', path: '/autosize/contains', value: 'padding' },
          // { op: 'add', path: '/autosize', value: 'fit-y' },
          // { op: 'add', path: '/height', value: '100%'}
          // { op: 'add', path: '/padding', value: 0 },
          // { op: 'add', path: '/autosize/resize', value: 'false' },
        ],
      });
      onCleanup(finalize);
      this.view.set(view);
    });
  }
}
