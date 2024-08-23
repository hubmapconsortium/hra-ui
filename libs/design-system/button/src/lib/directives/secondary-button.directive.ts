import { Directive } from '@angular/core';

/** Directive for secondary button */
@Directive({
  selector: '[hraSecondaryButton]',
  standalone: true,
  host: {
    class: 'secondary-button',
  },
})
export class SecondaryButtonDirective {}
