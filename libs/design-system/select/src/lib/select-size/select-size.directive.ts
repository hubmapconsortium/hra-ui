import { Directive, input } from '@angular/core';

/** Input options for select size */
export type SelectSize = 'small' | 'medium' | 'large';

/**
 * Directive for Select Size
 */
@Directive({
  selector: '[hraSelectSize]',
  standalone: true,
  host: {},
})
export class SelectSizeDirective {
  /** Size of select to use */
  readonly size = input.required<SelectSize>({ alias: 'hraSelectSize' });
}
