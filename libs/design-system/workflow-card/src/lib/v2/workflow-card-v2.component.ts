import { ChangeDetectionStrategy, Component, input, numberAttribute } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { StepIndicatorComponent } from '@hra-ui/design-system/step-indicator';

@Component({
  selector: 'hra-workflow-card-actions',
  standalone: true,
  template: '<ng-content></ng-content>',
  styles: ':host { display: flex; gap: 0.75rem; }',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkflowCardActionsComponent {}

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
  templateUrl: './workflow-card-v2.component.html',
  styleUrl: './workflow-card-v2.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkflowCardV2Component {
  readonly title = input.required<string>();
  readonly step = input(undefined, { transform: numberAttribute });
  readonly progress = input<number | undefined>(undefined);
}
