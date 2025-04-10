import { Directive, effect, inject, input } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { registerStyleComponents } from '@hra-ui/cdk/styling';
import { PlainTooltipStylesComponent } from './plain-tooltip-styles/plain-tooltip-styles.component';

/** Type of Tooltip size */
export type PlainTooltipSize = 'small' | 'medium';

/** Directive for Tooltip */
@Directive({
  selector: '[hraPlainTooltip]',
  standalone: true,
  hostDirectives: [
    {
      directive: MatTooltip,
      inputs: ['matTooltip: hraPlainTooltip', 'matTooltipPosition: hraPlainTooltipPosition'],
    },
  ],
})
export class PlainTooltipDirective {
  /** Size of the tooltip */
  readonly size = input<PlainTooltipSize>('medium', { alias: 'hraPlainTooltipSize' });

  /** Instance of MatTooltip */
  protected readonly tooltip = inject(MatTooltip);

  /** Registers the styles and sets class names for the tooltip container */
  constructor() {
    registerStyleComponents([PlainTooltipStylesComponent]);

    effect(() => {
      this.tooltip.tooltipClass = ['hra-plain-tooltip', `hra-plain-tooltip-${this.size()}`];
    });
  }
}
