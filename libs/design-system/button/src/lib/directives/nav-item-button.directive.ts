import { Directive } from '@angular/core';

/** Directive for navigation item button */
@Directive({
  selector: '[hraNavItemButton]',
  standalone: true,
  host: {
    class: 'nav-item-button',
  },
})
export class NavigationItemButtonDirective {}
