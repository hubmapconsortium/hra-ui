import { NavItems } from './nav-items';
import { Component, Input } from '@angular/core';
import { NAVIGATION_ITEMS } from '../../shared/navigation-items';
import { ConnectedPosition } from '@angular/cdk/overlay';


@Component({
  selector: 'ccf-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Input() navigationItems: NavItems[] = NAVIGATION_ITEMS;

  readonly MENU_TREE_POSITIONS: ConnectedPosition[] = [
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
      offsetX: 16,
      offsetY: 13
    }
  ];
}
