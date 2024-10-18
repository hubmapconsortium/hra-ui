import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MicroTooltipDirective } from '@hra-ui/design-system/micro-tooltip';
import { SoftwareStatusSizeDirective } from './software-status-indicator-size.directive';

/** Software status options */
export type SoftwareStatus = 'Preview' | 'Alpha' | 'Beta';

export type SoftwareStatusSize = 'small' | 'medium' | 'large';

/**
 * Indicator to display software status in nav header
 */
@Component({
  selector: 'hra-software-status-indicator',
  standalone: true,
  imports: [CommonModule, MicroTooltipDirective, SoftwareStatusSizeDirective],
  templateUrl: './software-status-indicator.component.html',
  styleUrl: './software-status-indicator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SoftwareStatusIndicatorComponent {
  /** Current status of app */
  readonly status = input.required<SoftwareStatus>();

  readonly size = input<SoftwareStatusSize>('medium');

  /** Tooltips corresponding to software status */
  readonly tooltips: Record<SoftwareStatus, string> = {
    Preview: 'Earliest development stage: Core features are under construction and evolving.',
    Alpha: 'Early testing stage: Features may change. Expect bugs and incomplete functionality.',
    Beta: 'Near-final stage: Most features are ready, fewer bugs, and more feedback is needed.',
  };
}
