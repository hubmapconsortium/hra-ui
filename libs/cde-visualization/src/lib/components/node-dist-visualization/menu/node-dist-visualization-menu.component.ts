import { booleanAttribute, ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconButtonSizeDirective } from '@hra-ui/design-system/icon-button';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';

/**
 * Menu for node dist visualization expansion panel
 */
@Component({
  selector: 'cde-node-dist-visualization-menu',
  imports: [MatMenuModule, MatIconModule, ButtonsModule, IconButtonSizeDirective, PlainTooltipDirective],
  templateUrl: './node-dist-visualization-menu.component.html',
  styleUrl: './node-dist-visualization-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeDistVisualizationMenuComponent {
  /** If visualization is in full screen */
  readonly fullscreenMode = input(false, { transform: booleanAttribute });

  /** If edges are disabled */
  readonly edgesDisabled = model(false);

  /** Emits when full screen option clicked */
  readonly fullscreenClick = output<void>();
  /** Emits when download option clicked */
  readonly downloadClick = output<void>();
  /** Emits when reset visualization view option clicked */
  readonly resetViewClick = output<void>();
  /** Emits when reset deleted cells option option clicked */
  readonly resetDeletedClick = output<void>();
}
