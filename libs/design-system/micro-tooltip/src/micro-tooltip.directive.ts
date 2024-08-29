import { Directive, effect, inject, input } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { registerStyleComponents } from '@hra-ui/cdk/styling';
import { MicroTooltipStylesComponent } from './micro-tooltip-styles/micro-tooltip-styles.component';

/** Type of Tooltip size */
export type MicroTooltipSize = 'small' | 'medium';

/** Directive for Tooltip */
@Directive({
  selector: '[hraMicroTooltip]',
  standalone: true,
  hostDirectives: [
    {
      directive: MatTooltip,
      inputs: ['matTooltip: hraMicroTooltip', 'matTooltipPosition: hraMicroTooltipPosition'],
    },
  ],
})
export class MicroTooltipDirective {
  /** Size of the tooltip */
  readonly size = input<MicroTooltipSize>('medium', { alias: 'hraMicroTooltipSize' });

  /** Instance of MatTooltip */
  protected readonly tooltip = inject(MatTooltip);

  /** Registers the styles and sets class names for the tooltip container */
  constructor() {
    registerStyleComponents([MicroTooltipStylesComponent]);

    effect(() => {
      this.tooltip.tooltipClass = ['hra-micro-tooltip', `hra-micro-tooltip-${this.size()}`];
    });
  }
}
