import { NavItems } from './nav-items';
import { Component, Input } from '@angular/core';
import { NAVIGATION_ITEMS } from '../../shared/navigation-items';


@Component({
  selector: 'ccf-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  @Input()
  navigationItems: NavItems[] = NAVIGATION_ITEMS;

}
