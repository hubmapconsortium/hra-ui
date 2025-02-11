import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { HubmapMenuContentComponent } from '../hubmap-menu-content/hubmap-menu-content.component';
import { MenuContentComponent } from '../menu-content/menu-content.component';
import { HubmapMenu } from '../types/hubmap-menu.schema';
import { Menu } from '../types/menus.schema';

@Component({
  selector: 'hra-desktop-menu',
  standalone: true,
  imports: [CommonModule, ScrollingModule, HubmapMenuContentComponent, MenuContentComponent],
  templateUrl: './desktop-menu.component.html',
  styleUrl: './desktop-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesktopMenuComponent {
  readonly menu = input.required<Menu | HubmapMenu>();

  protected typedMenu = computed(() => {
    const menu = this.menu();
    return '$schema' in menu ? { type: 'hubmap' as const, menu } : { type: 'menu' as const, menu };
  });
}
