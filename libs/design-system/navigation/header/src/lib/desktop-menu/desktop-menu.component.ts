import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MenuRendererModule } from '../menu-renderer/menu-renderer.module';
import { Menu } from '../types/menus.schema';

@Component({
  selector: 'hra-desktop-menu',
  standalone: true,
  imports: [CommonModule, MatDividerModule, MenuRendererModule],
  templateUrl: './desktop-menu.component.html',
  styleUrl: './desktop-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesktopMenuComponent {
  readonly menu = input.required<Menu>();

  constructor() {
    console.log(this);
  }
}
