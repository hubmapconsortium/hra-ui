import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cde-cde-visualization',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cde-visualization.component.html',
  styleUrl: './cde-visualization.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CdeVisualizationComponent {}
