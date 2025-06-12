import { ChangeDetectionStrategy, Component, input, numberAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Results Indicator Component */
@Component({
  selector: 'hra-results-indicator',
  imports: [CommonModule],
  templateUrl: './results-indicator.component.html',
  styleUrl: './results-indicator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsIndicatorComponent {
  /** Input for value */
  readonly value = input.required({ transform: numberAttribute });
  /** Input for total */
  readonly total = input.required({ transform: numberAttribute });
  /** Input for description */
  readonly description = input.required<string>();
}
