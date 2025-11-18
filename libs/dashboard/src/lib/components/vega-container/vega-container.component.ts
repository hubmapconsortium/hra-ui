import { CommonModule, DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, effect, inject, input, viewChild } from '@angular/core';
import embed from 'vega-embed';
import { z } from 'zod';
import { DashboardComponent, DashboardComponentSpecFor } from '../../dashboard/dashboard.model';
import { TITLE_CARD_DEF, TitleCardComponent } from '../title-card/title-card.component';

/** Fonts for Histogram */
const HISTOGRAM_FONTS = ['12px Metropolis', '14px Metropolis'];

/** Vega Container Component, embeds a vega lite visualization inside a card */
@Component({
  selector: 'hra-vega-container',
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
    aspectRatio: z.string().default('3/1'),
  });

  /** Input for vega container component */
  readonly spec = input.required<DashboardComponentSpecFor<typeof VegaContainerComponent>>();

  /** Reference to the element where visualization is to be embedded */
  protected readonly visRef = viewChild.required<ElementRef>('vis');

  /** Reference to the DOCUMENT Injection Token */
  private readonly document = inject(DOCUMENT);

  /** Method to ensure that the fonts load */
  private async ensureFontsLoaded(): Promise<void> {
    const loadPromises = HISTOGRAM_FONTS.map((font) => this.document.fonts.load(font));
    await Promise.all(loadPromises);
  }

  /** Embeds the vega lite visualization to the element */
  protected readonly embedRef = effect(async (onCleanup) => {
    const el = this.visRef().nativeElement;
    await this.ensureFontsLoaded();
    const { finalize } = await embed(el, this.spec().specUrl, {
      actions: false,
    });

    onCleanup(finalize);
  });
}
