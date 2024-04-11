import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavItems } from '../toolbar/nav-items';

/** Displays a navigation bar on top of the page */
@Component({
  selector: 'ccf-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  /** Menu items to be displayed on the navigation bar */
  @Input() items: NavItems[] = [];

  /** Emits the menu item data when option is selected */
  @Output() readonly itemClick = new EventEmitter<NavItems>();

  /** Opens menu item link in external window */
  externalWindow(url: string): void {
    window.open(url, '_blank');
  }
}
