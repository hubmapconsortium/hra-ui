import { booleanAttribute, ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { ViewMode } from '@hra-ui/node-dist-vis/models';

/**
 * Controls for node dist visualization
 */
@Component({
  selector: 'cde-node-dist-visualization-controls',
  standalone: true,
  imports: [MatIconModule, ButtonsModule, PlainTooltipDirective],
  templateUrl: './node-dist-visualization-controls.component.html',
  styleUrl: './node-dist-visualization-controls.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeDistVisualizationControlsComponent {
  /** Current view mode */
  readonly viewMode = model<ViewMode>('explore');

  /** Whether delete button is disabled */
  readonly deleteDisabled = input(false, { transform: booleanAttribute });

  /** Emits when delete button clicked */
  readonly deleteClick = output<void>();
}
