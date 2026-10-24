import { Directive, effect, inject, InjectionToken, input, Provider } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { registerStyleComponents } from '@hra-ui/cdk/styling';
import { PlainTooltipStylesComponent } from './plain-tooltip-styles/plain-tooltip-styles.component';

/** Type of Tooltip size */
export type PlainTooltipSize = 'small' | 'medium';

/** Plain tooltip options */
export interface PlainTooltipOptions {
  /** Whether tooltips use the HRA plain tooltip styles. When false, they keep the default Material tooltip styles */
  hraStyles: boolean;
}

/** Injection token for plain tooltip options */
export const PLAIN_TOOLTIP_OPTIONS = new InjectionToken<PlainTooltipOptions>('PlainTooltipOptions', {
  providedIn: 'root',
  factory: () => ({ hraStyles: true }),
});

/**
 * Provides plain tooltip options
 *
 * @param options Plain tooltip options
 * @returns A provider for the options
 */
export function providePlainTooltipOptions(options: PlainTooltipOptions): Provider {
  return { provide: PLAIN_TOOLTIP_OPTIONS, useValue: options };
}

/** Directive for Tooltip */
@Directive({
  selector: '[hraPlainTooltip]',
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

  /** Registers the styles and sets class names for the tooltip container, unless the HRA styles are turned off */
  constructor() {
    if (!inject(PLAIN_TOOLTIP_OPTIONS).hraStyles) {
      return;
    }

    registerStyleComponents([PlainTooltipStylesComponent]);

    effect(() => {
      this.tooltip.tooltipClass = ['hra-plain-tooltip', `hra-plain-tooltip-${this.size()}`];
    });
  }
}
