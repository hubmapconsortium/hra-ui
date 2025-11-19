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
  /** Count of filtered results */
  readonly count = input.required({ transform: numberAttribute });

  /** Label text for results count */
  readonly label = input<string>('Results:');

  /** Description text */
  readonly description = input<string>('End of results');
}
