import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { HraCommonModule } from '@hra-ui/common';
import { EmptyStateContent } from './empty-state.content';

/**
 * Covers a chart that has nothing to show, with a heading, supporting text, and an action.
 * Place it in a positioned container next to the chart.
 */
@Component({
  selector: 'cde-empty-state',
  imports: [HraCommonModule, MatButtonModule],
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyStateComponent {
  /** Text content */
  readonly content = input.required<EmptyStateContent>();

  /** Emits when the action button is clicked */
  readonly actionClick = output<void>();
}
