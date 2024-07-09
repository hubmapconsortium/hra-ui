import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

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
  /** Defines an input property for the home link */
  readonly homeLink = input<string>();

  /** Defines an output event for resetting the view */
  readonly resetView = output();
  /** Defines an output event for resetting all settings */
  readonly resetAll = output();

  /** Defines an output event for downloading nodes */
  readonly downloadNodes = output();
  /** Defines an output event for downloading edges */
  readonly downloadEdges = output();

  /** Flag to check if reset info tooltip is open */
  resetInfoOpen = false;
  /** Flag to check if embed info tooltip is open */
  embedInfoOpen = false;
}
