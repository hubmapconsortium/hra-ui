import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { HubmapMenuContentComponent } from '../hubmap-menu-content/hubmap-menu-content.component';
import { MenuContentComponent } from '../menu-content/menu-content.component';
import { HubmapMenuGroup } from '../types/hubmap-menu.schema';
import { Menu } from '../types/menus.schema';

/**
 * Display a menu for mobile sized screens
 */
@Component({
  selector: 'hra-mobile-menu',
  imports: [
    CommonModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    ScrollingModule,
    HubmapMenuContentComponent,
    MenuContentComponent,
  ],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileMenuComponent {
  /** Hubmap menu */
  readonly hubmapMenu = input.required<HubmapMenuGroup[]>();
  /** All other menus */
  readonly menus = input.required<Menu[]>();
}
