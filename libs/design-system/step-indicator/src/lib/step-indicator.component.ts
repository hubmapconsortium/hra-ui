import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Step indicator for module components that have multiple steps
 */
@Component({
  selector: 'hra-step-indicator',
  imports: [CommonModule],
  templateUrl: './step-indicator.component.html',
  styleUrl: './step-indicator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepIndicatorComponent {
  /** Step value */
  readonly value = input.required<number>();
}
