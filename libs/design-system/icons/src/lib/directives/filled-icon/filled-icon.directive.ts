import { ChangeDetectionStrategy, Component, Directive, input, ViewEncapsulation } from '@angular/core';
import { registerStyleComponents } from '@hra-ui/cdk/styling';

/** Global styles for filled icon */
@Component({
  selector: 'hra-filled-icon-styles',
  standalone: true,
  template: '',
  styleUrls: ['./filled-icon.directive.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilledIconStylesComponent {}

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
  /** input for background color */
  readonly color = input.required<string>({ alias: 'hraFilledIcon' });

  /** Initialize styles */
  constructor() {
    registerStyleComponents([FilledIconStylesComponent]);
  }
}
