import { OverlayModule } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';

/**
 * Component for visualization page header
 */
@Component({
  selector: 'cde-visualization-header',
  imports: [HraCommonModule, MatDividerModule, MatIconModule, MatButtonModule, OverlayModule],
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

  /** Flag to check if reset info tooltip is open */
  resetInfoOpen = false;
  /** Flag to check if embed info tooltip is open */
  embedInfoOpen = false;
}
