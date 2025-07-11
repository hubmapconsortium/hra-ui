import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { SoftwareStatusSizeDirective } from './software-status-indicator-size.directive';

/** Software status options */
export type SoftwareStatus = 'Preview' | 'Alpha' | 'Beta';

/** Software status size options */
export type SoftwareStatusSize = 'small' | 'medium' | 'large';

/**
 * Indicator to display software status in nav header
 */
@Component({
  selector: 'hra-software-status-indicator',
  imports: [CommonModule, PlainTooltipDirective, SoftwareStatusSizeDirective],
  templateUrl: './software-status-indicator.component.html',
  styleUrl: './software-status-indicator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SoftwareStatusIndicatorComponent {
  /** Current status of app */
  readonly status = input.required<SoftwareStatus>();

  /** Size of indicator */
  readonly size = input<SoftwareStatusSize>('medium');

  /** Tooltips corresponding to software status */
  readonly tooltips: Record<SoftwareStatus, string> = {
    Preview: 'Earliest development stage: Core features are under construction and evolving.',
    Alpha: 'Early testing stage: Features may change. Expect bugs and incomplete functionality.',
    Beta: 'Near-final stage: Most features are ready, fewer bugs, and more feedback is needed.',
  };
}
