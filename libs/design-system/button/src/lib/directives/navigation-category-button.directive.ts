import { Directive } from '@angular/core';

/** Directive for navigation category button */
@Directive({
  selector: '[hraNavCatButton]',
  standalone: true,
  host: {
    class: 'nav-cat-button',
  },
})
export class NavigationCategoryButtonDirective {}
