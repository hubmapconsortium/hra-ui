import { booleanAttribute, ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { ViewMode } from '@hra-ui/node-dist-vis/models';

/** A view mode toggle */
interface ViewModeOption {
  /** View mode the toggle picks */
  value: ViewMode;
  /** Label, which also names the toggle when it shows its icon */
  label: string;
  /** Icon shown in place of the label on compact screens */
  icon: string;
  /** What the mode does */
  tooltip: string;
}

/** View mode toggles, in order */
const VIEW_MODES: ViewModeOption[] = [
  { value: 'select', label: 'Select', icon: 'highlight_alt', tooltip: 'Select cells to delete from this dataset' },
  { value: 'inspect', label: 'Inspect', icon: 'info', tooltip: 'Get information about individual cell types' },
  {
    value: 'explore',
    label: 'Explore',
    icon: 'pan_tool',
    tooltip: 'Zoom, pan, and rotate the view of this visualization',
  },
];

/**
 * Controls for node dist visualization
 */
@Component({
  selector: 'cde-node-dist-visualization-controls',
  imports: [MatIconModule, ButtonsModule, PlainTooltipDirective, HraCommonModule],
  templateUrl: './node-dist-visualization-controls.component.html',
  styleUrl: './node-dist-visualization-controls.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeDistVisualizationControlsComponent {
  /** Current view mode */
  readonly viewMode = model<ViewMode>('explore');

  /** Whether cells are selected, which shows the delete button */
  readonly deleteAvailable = input(false, { transform: booleanAttribute });

  /** Whether the view mode toggles show icons instead of labels, so the header fits compact screens */
  readonly compact = input(false, { transform: booleanAttribute });

  /** Emits when delete button clicked */
  readonly deleteClick = output<void>();

  /** View mode toggles */
  protected readonly viewModes = VIEW_MODES;
}
