import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/**
 * Applies micro tooltip styles globally
 */
@Component({
  selector: 'hra-micro-tooltip-styles',
  standalone: true,
  template: '',
  styleUrls: ['./micro-tooltip-styles.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MicroTooltipStylesComponent {}
