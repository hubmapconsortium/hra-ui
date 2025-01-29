import { booleanAttribute, ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ViewMode } from '@hra-ui/node-dist-vis/models';

@Component({
  selector: 'cde-node-dist-visualization-controls',
  standalone: true,
  imports: [MatButtonToggleModule, MatIconModule, ButtonsModule],
  templateUrl: './node-dist-visualization-controls.component.html',
  styleUrl: './node-dist-visualization-controls.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeDistVisualizationControlsComponent {
  readonly viewMode = model<ViewMode>('explore');
  readonly deleteDisabled = input(false, { transform: booleanAttribute });

  readonly deleteClick = output<void>();
}
