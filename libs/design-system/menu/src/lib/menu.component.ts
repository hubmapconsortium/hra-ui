import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { IconButtonSize, IconButtonSizeDirective } from '@hra-ui/design-system/icon-button';

/** Menu option interface */
export interface MenuOption {
  /** Name of option */
  name: string;
  /** Material icon name */
  icon: string;
  /** Options to open in a second menu */
  expandedOptions?: MenuOption[];
}

/**
 * Nested Angular Material menu component
 */
@Component({
  selector: 'hra-menu',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule, MatRippleModule, IconButtonSizeDirective],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  /** Menu size */
  readonly size = input<IconButtonSize>('medium');

  /** List of menu options */
  readonly menuOptions = input<MenuOption[]>([]);

  /** List of suboptions to display in the second menu */
  suboptions: MenuOption[] = [];
}
