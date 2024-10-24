import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

/**
 * Component that appears when users are completing a workflow process
 */
@Component({
  selector: 'hra-workflow-card',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  templateUrl: './workflow-card.component.html',
  styleUrl: './workflow-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkflowCardComponent {
  /** Current data load progress */
  loadProgress = input<number>(0);

  /** Whether the card allows uploading of files */
  allowUpload = input<boolean>(false);
}
