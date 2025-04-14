import { Directive, input } from '@angular/core';

/**
 * Directive for filled icon
 */
@Directive({
  selector: '[hraFilledIcon]',
  standalone: true,
  host: {
    class: 'hra-filled-icon',
    '[style.--hra-filled-icon-color]': 'color()',
  },
})
export class FilledIconDirective {
  readonly color = input.required<string>({ alias: 'hraFilledIcon' });
}
