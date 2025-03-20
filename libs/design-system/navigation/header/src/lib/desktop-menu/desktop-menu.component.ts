import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { HubmapMenuContentComponent } from '../hubmap-menu-content/hubmap-menu-content.component';
import { MenuContentComponent } from '../menu-content/menu-content.component';
import { HubmapMenuGroup } from '../types/hubmap-menu.schema';
import { Menu } from '../types/menus.schema';

/**
 * Display a menu for desktop sized screens
 */
@Component({
  selector: 'hra-desktop-menu',
  imports: [CommonModule, ScrollingModule, HubmapMenuContentComponent, MenuContentComponent],
  templateUrl: './desktop-menu.component.html',
  styleUrl: './desktop-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesktopMenuComponent {
  /** Menu to display */
  readonly menu = input.required<Menu | HubmapMenuGroup[]>();

  /** Menu object along with whether it is a hubmap or regular menu type */
  protected readonly typedMenu = computed(() => {
    const menu = this.menu();
    return Array.isArray(menu) ? { type: 'hubmap' as const, menu } : { type: 'menu' as const, menu };
  });
}
