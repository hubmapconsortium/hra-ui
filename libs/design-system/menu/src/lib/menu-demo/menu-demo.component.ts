import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { IconButtonSizeDirective } from '@hra-ui/design-system/icon-button';

/** Menu option interface */
export interface MenuDemoOption {
  /** Name of option */
  name: string;
  /** Material icon name */
  icon: string;
  /** Options to open in a second menu */
  expandedOptions?: MenuDemoOption[];
}

/**
 * Nested Angular Material menu component
 */
@Component({
  selector: 'hra-menu',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule, MatRippleModule, IconButtonSizeDirective],
  templateUrl: './menu-demo.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuDemoComponent {
  /** List of menu options */
  readonly menuOptions = input<MenuDemoOption[]>([]);

  /** List of suboptions to display in the second menu */
  suboptions: MenuDemoOption[] = [];
}
