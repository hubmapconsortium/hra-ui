import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { OverlayModule } from '@angular/cdk/overlay';

/**
 * Component for visualization page header
 */
@Component({
  selector: 'cde-visualization-header',
  standalone: true,
  imports: [CommonModule, MatDividerModule, MatIconModule, MatButtonModule, OverlayModule],
  templateUrl: './visualization-header.component.html',
  styleUrl: './visualization-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisualizationHeaderComponent {
  /** Flag to check if reset info tooltip is open */
  resetInfoOpen = false;
  /** Flag to check if embed info tooltip is open */
  embedInfoOpen = false;
}
