import { Directive, input } from '@angular/core';

/** Color options */
export type ProgressBarColor = 'dark' | 'color';

/** Style a mat-progress-bar to a specific named color */
@Directive({
  selector: 'mat-progress-bar[hraProgressBarColor]',
  standalone: true,
  host: {
    '[class]': '"hra-progress-bar-color-" + color()',
  },
})
export class ProgressBarColorDirective {
  /** Color of progress bar */
  readonly color = input.required<ProgressBarColor>({ alias: 'hraProgressBarColor' });
}
