import { HubmapMenuGroupDirective } from './hubmap-menu-group.directive';
import { HubmapMenuItemDirective } from './hubmap-menu-item.directive';
import { MenuDividerDirective } from './menu-divider.directive';
import { MenuGroupDirective } from './menu-group.directive';
import { MenuItemDirective } from './menu-item.directive';
import { MenuSubGroupDirective } from './menu-subgroup.directive';

export const HUBMAP_MENU_TEMPLATE_DIRECTIVES = [HubmapMenuGroupDirective, HubmapMenuItemDirective];

export const MENU_TEMPLATE_DIRECTIVES = [
  MenuDividerDirective,
  MenuGroupDirective,
  MenuItemDirective,
  MenuSubGroupDirective,
];
