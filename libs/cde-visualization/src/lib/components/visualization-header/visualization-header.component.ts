import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

/**
 * Component for visualization page header
 */
@Component({
  selector: 'cde-visualization-header',
  standalone: true,
  imports: [CommonModule, MatDividerModule, MatIconModule, MatButtonModule],
  templateUrl: './visualization-header.component.html',
  styleUrl: './visualization-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisualizationHeaderComponent {}
