import { NavItems } from './nav-items';
import { Component, Input } from '@angular/core';
import { NAVIGATION_ITEMS } from 'src/app/shared/navigation-items';
import { Router } from '@angular/router';


@Component({
  selector: 'ccf-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor(private router: Router) { }

  down: boolean = false;

  @Input()
  navigationItems: NavItems[] = NAVIGATION_ITEMS;

  itemClicked(item: NavItems): void {
    this.router.navigate([item.route]);
  }

}
