import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { RouterExtModule } from '@hra-ui/common/router-ext';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { Menu } from '../types/menus.schema';

/**
 * Displays the menu for mobile screens
 */
@Component({
  selector: 'cns-menu-content',
  imports: [HraCommonModule, RouterExtModule, MatIconModule, ButtonsModule, MatDividerModule],
  templateUrl: './menu-content.component.html',
  styleUrl: './menu-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuContentComponent {
  /** Menu data to display */
  readonly menu = input.required<Menu>();
}
