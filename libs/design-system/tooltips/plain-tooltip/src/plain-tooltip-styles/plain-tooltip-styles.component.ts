import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/**
 * Applies plain tooltip styles globally
 */
@Component({
  selector: 'hra-plain-tooltip-styles',
  standalone: true,
  template: '',
  styleUrls: ['./plain-tooltip-styles.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlainTooltipStylesComponent {}
