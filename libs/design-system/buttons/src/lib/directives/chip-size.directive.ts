import { Directive, input } from '@angular/core';

/** Named chip sizes */
export type ChipSize = 'small' | 'medium' | 'large';

/** Style a chip to a specific named size */
@Directive({
  selector: 'mat-chip[hraChipSize], mat-chip-option[hraChipSize], mat-chip-row[hraChipSize]',
  standalone: true,
  host: {
    '[class]': '"hra-chip-" + size()',
  },
})
export class ChipSizeDirective {
  /** Size of chip */
  readonly size = input.required<ChipSize>({ alias: 'hraChipSize' });
}
