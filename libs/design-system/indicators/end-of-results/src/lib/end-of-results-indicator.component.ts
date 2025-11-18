import { ChangeDetectionStrategy, Component, input, numberAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hra-end-of-results-indicator',
  imports: [CommonModule],
  templateUrl: './end-of-results-indicator.component.html',
  styleUrl: './end-of-results-indicator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EndOfResultsIndicatorComponent {
  readonly resultCount = input.required({ transform: numberAttribute });

  readonly resultsLabel = input<string>('Results:');

  readonly endLabel = input<string>('End of results');
}
