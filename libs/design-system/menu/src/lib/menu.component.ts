import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { IconButtonSize, IconButtonSizeDirective } from '@hra-ui/design-system/icon-button';

export interface MenuOption {
  title: string;
  icon: string;
  expandedOptions?: MenuOption[];
}

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
  readonly size = input<IconButtonSize>('medium');

  readonly menuOptions = input<MenuOption[]>([]);

  suboptions: MenuOption[] = [];

  setSubmenuOptions(options: MenuOption[]) {
    this.suboptions = options;
  }
}
