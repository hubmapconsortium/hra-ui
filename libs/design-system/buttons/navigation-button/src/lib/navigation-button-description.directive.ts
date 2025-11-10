import { Directive } from '@angular/core';

/**
 * Directive for navigation button description
 * Used for supporting text
 */
@Directive({
  selector: '[hraNavigationButtonDescription]',
  host: {
    class: 'supporting-text',
  },
})
export class NavigationButtonDescriptionDirective {}
