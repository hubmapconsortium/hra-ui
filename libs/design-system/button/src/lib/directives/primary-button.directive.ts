import { Directive } from '@angular/core';

/** Directive for Primary Button */
@Directive({
  selector: '[hraPrimaryButton]',
  standalone: true,
  host: {
    class: 'primary-button',
  },
})
export class PrimaryButtonDirective {}
