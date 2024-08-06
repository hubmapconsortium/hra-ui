import { NavItems } from './nav-items';
import { Component, Input } from '@angular/core';
import { NAVIGATION_ITEMS } from '../../shared/navigation-items';
import { ConnectedPosition } from '@angular/cdk/overlay';
import { HUBMAP_NAV_ITEMS } from '../../shared/hubmap-navigation-items';

/** Displays a toolbar on the top of each page */
@Component({
  selector: 'ccf-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  hubmapNavItems = HUBMAP_NAV_ITEMS;
  hubmapMobileMenu = [...NAVIGATION_ITEMS, { menuName: 'HuBMAP Tools and Applications', componentName: 'hubmap-nav' }];

  /** Menu items to be displayed on the toolbar */
  @Input() navigationItems: NavItems[] = NAVIGATION_ITEMS;

  /** Position of Menu item card on small screen size */
  readonly MENU_TREE_POSITIONS: ConnectedPosition[] = [
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
      offsetX: 16,
      offsetY: 10,
    },
  ];
}
