import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Component that appears when users are completing a workflow process
 */
@Component({
  selector: 'hra-workflow-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './workflow-card.component.html',
  styleUrl: './workflow-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkflowCardComponent {}
