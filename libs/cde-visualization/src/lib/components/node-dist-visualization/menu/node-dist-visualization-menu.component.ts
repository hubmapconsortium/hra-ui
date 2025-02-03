import { booleanAttribute, ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconButtonSizeDirective } from '@hra-ui/design-system/icon-button';
import { MicroTooltipDirective } from '@hra-ui/design-system/micro-tooltip';

@Component({
  selector: 'cde-node-dist-visualization-menu',
  standalone: true,
  imports: [MatMenuModule, MatIconModule, ButtonsModule, IconButtonSizeDirective, MicroTooltipDirective],
  templateUrl: './node-dist-visualization-menu.component.html',
  styleUrl: './node-dist-visualization-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeDistVisualizationMenuComponent {
  readonly fullscreenMode = input(false, { transform: booleanAttribute });
  readonly edgesDisabled = model(false);

  readonly fullscreenClick = output<void>();
  readonly downloadClick = output<void>();
  readonly resetViewClick = output<void>();
  readonly resetDeletedClick = output<void>();
}
