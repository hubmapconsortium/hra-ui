import { ChangeDetectionStrategy, Component, input, numberAttribute, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hra-results-indicator',
  imports: [CommonModule],
  templateUrl: './results-indicator.component.html',
  styleUrl: './results-indicator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsIndicatorComponent {
  readonly value = input.required({ transform: numberAttribute });
  readonly total = input.required({ transform: numberAttribute });
}
