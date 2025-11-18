import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/**
 * Applies plain tooltip styles globally
 */
@Component({
  selector: 'hra-plain-tooltip-styles',
  template: '',
  styleUrl: './plain-tooltip-styles.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PlainTooltipStylesComponent {}
