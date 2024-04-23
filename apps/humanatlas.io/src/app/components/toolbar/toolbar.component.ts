import { NavItems } from './nav-items';
import { Component, Input } from '@angular/core';
import { NAVIGATION_ITEMS } from '../../shared/navigation-items';
import { ConnectedPosition } from '@angular/cdk/overlay';

/** Displays a toolbar on the top of each page */
@Component({
  selector: 'ccf-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
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
