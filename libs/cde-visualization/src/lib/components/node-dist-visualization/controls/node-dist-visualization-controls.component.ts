import { booleanAttribute, ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { ButtonModule } from '@hra-ui/design-system/button';
import { ViewMode } from '@hra-ui/node-dist-vis/models';

@Component({
  selector: 'cde-node-dist-visualization-controls',
  imports: [MatButtonToggleModule, MatIconModule, ButtonModule],
  templateUrl: './node-dist-visualization-controls.component.html',
  styleUrl: './node-dist-visualization-controls.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeDistVisualizationControlsComponent {
  readonly viewMode = model<ViewMode>('explore');
  readonly deleteDisabled = input(false, { transform: booleanAttribute });

  readonly deleteClick = output<void>();
}
