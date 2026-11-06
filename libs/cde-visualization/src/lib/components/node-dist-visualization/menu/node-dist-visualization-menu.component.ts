import { ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';

/**
 * Menu for the fullscreen distance visualization, which covers the toolbar
 */
@Component({
  selector: 'cde-node-dist-visualization-menu',
  imports: [MatMenuModule, MatIconModule, ButtonsModule, PlainTooltipDirective, HraCommonModule],
  templateUrl: './node-dist-visualization-menu.component.html',
  styleUrl: './node-dist-visualization-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeDistVisualizationMenuComponent {
  /** If edges are disabled */
  readonly edgesDisabled = model(false);

  /** Whether any cells were deleted, so they can be restored */
  readonly hasDeletedCells = input(false);

  /** Emits when reset visualization view option clicked */
  readonly resetViewClick = output<void>();

  /** Emits when reset deleted cells option option clicked */
  readonly resetDeletedClick = output<void>();
}
