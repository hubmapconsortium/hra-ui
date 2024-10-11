import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type SoftwareStatus = 'Preview' | 'Alpha' | 'Beta';

export const SoftwareTooltipInfo: Record<SoftwareStatus, string> = {
  Preview: 'Earliest development stage: Core features are under construction and evolving.',
  Alpha: 'Early testing stage: Features may change. Expect bugs and incomplete functionality.',
  Beta: 'Near-final stage: Most features are ready, fewer bugs, and more feedback is needed.',
};

@Component({
  selector: 'hra-software-status-indicator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './software-status-indicator.component.html',
  styleUrl: './software-status-indicator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SoftwareStatusIndicatorComponent {
  readonly status = input<SoftwareStatus>();

  tooltips = SoftwareTooltipInfo;
}
