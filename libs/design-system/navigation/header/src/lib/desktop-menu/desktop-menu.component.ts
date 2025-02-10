import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { MENU_TEMPLATE_DIRECTIVES } from '../directives/directives';
import { Menu } from '../types/menus.schema';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';

@Component({
  selector: 'hra-desktop-menu',
  standalone: true,
  imports: [CommonModule, MatDividerModule, MatIconModule, ButtonsModule, ScrollingModule, MENU_TEMPLATE_DIRECTIVES],
  templateUrl: './desktop-menu.component.html',
  styleUrl: './desktop-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesktopMenuComponent {
  readonly menu = input.required<Menu>();
}
