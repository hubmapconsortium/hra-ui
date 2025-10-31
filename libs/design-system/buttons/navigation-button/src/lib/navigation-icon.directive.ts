import { Directive, input } from '@angular/core';

/** Position for navigation icon */
export type NavigationIconPosition = 'leading' | 'trailing';

/**
 * Directive for navigation button icons
 * Use with mat-icon
 */
@Directive({
  selector: '[hraNavigationIcon]',
  host: {
    '[class.leading-icon]': 'hraNavigationIcon() === "leading"',
    '[class.trailing-icon]': 'hraNavigationIcon() !== "leading"',
  },
})
export class NavigationIconDirective {
  /** Icon position (leading or trailing) */
  readonly hraNavigationIcon = input<NavigationIconPosition>('trailing');
}
