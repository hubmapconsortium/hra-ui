import { Directive } from '@angular/core';

/**
 * Directive for navigation button tagline
 * Used for the primary label text
 */
@Directive({
  selector: '[hraNavigationButtonTagline]',
  host: {
    class: 'label',
  },
})
export class NavigationButtonTaglineDirective {}
