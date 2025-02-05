import { ChangeDetectionStrategy, Component, input, numberAttribute } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { StepIndicatorComponent } from '@hra-ui/design-system/step-indicator';

/** Actions placed next to the card title */
@Component({
  selector: 'hra-workflow-card-actions',
  standalone: true,
  template: '<ng-content></ng-content>',
  styles: ':host { display: flex; gap: 0.75rem; }',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkflowCardActionsComponent {}

/** Additional content placed on very right side of the header */
@Component({
  selector: 'hra-workflow-card-extra',
  standalone: true,
  template: '<ng-content></ng-content>',
  styles: ':host { display: flex; gap: 0.75rem; }',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkflowCardExtraComponent {}

/**
 * Component that appears when users are completing a workflow process
 */
@Component({
  selector: 'hra-workflow-card',
  standalone: true,
  imports: [MatProgressBarModule, StepIndicatorComponent],
  templateUrl: './workflow-card.component.html',
  styleUrl: './workflow-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkflowCardComponent {
  /** Card title */
  readonly tagline = input.required<string>();
  /** Step indicator value */
  readonly step = input(undefined, { transform: numberAttribute });
  /** Load progress */
  readonly progress = input<number | undefined>(undefined);
}
