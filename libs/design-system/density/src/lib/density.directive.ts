import { Directive, input } from '@angular/core';
import { ValueOf } from 'type-fest';

/** Density levels */
export type Density = ValueOf<typeof Densities>;

/** Density level enum */
export const Densities = {
  Compact0: 'compact-0',
  Compact2: 'compact-2',
  Compact4: 'compact-4',
} as const;

/** Style a component to a specific density level */
@Directive({
  selector: '[hraDensity]',
  standalone: true,
  host: {
    '[class]': '"hra-density-" + density()',
  },
})
export class DensityDirective {
  /** Density level of the component */
  readonly density = input.required<Density>({ alias: 'hraDensity' });
}
