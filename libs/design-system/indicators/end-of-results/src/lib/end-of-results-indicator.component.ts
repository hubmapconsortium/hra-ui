import { ChangeDetectionStrategy, Component, input, numberAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * End of Results Indicator Component
 */
@Component({
  selector: 'hra-end-of-results-indicator',
  imports: [CommonModule],
  templateUrl: './end-of-results-indicator.component.html',
  styleUrl: './end-of-results-indicator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EndOfResultsIndicatorComponent {
  /** Number of filtered results */
  readonly resultCount = input.required({ transform: numberAttribute });

  /** Label text for results count */
  readonly resultsLabel = input<string>('Results:');

  /** Label text for end message */
  readonly endLabel = input<string>('End of results');
}
