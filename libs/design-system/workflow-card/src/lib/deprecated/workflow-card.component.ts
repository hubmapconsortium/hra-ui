import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

/**
 * Component that appears when users are completing a workflow process
 * @deprecated Use [WorkflowCardComponent](../workflow-card.component.ts) instead
 */
@Component({
  selector: 'hra-workflow-card',
  imports: [CommonModule, MatProgressBarModule],
  templateUrl: './workflow-card.component.html',
  styleUrl: './workflow-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeprecatedWorkflowCardComponent {
  /** Current data load progress */
  readonly loadProgress = input<number>(0);

  /** Whether the card allows uploading of files */
  readonly allowUpload = input<boolean>(false);
}
