/**
 * Partial implementation until inlineSVG properly supports angular 19's standalone option
 * https://github.com/siandreev/ng-inline-svg/pull/6
 */

import { Directive, NgModule } from '@angular/core';

@Directive({
  // eslint-disable-next-line
  selector: '[inlineSVG]',
  // eslint-disable-next-line
  inputs: ['inlineSVG', 'evalScripts'],
})
export class InlineSVGDirective {}

@NgModule({
  imports: [InlineSVGDirective],
  exports: [InlineSVGDirective],
})
export class InlineSVGModule {
  static forRoot(..._args: unknown[]) {
    return InlineSVGModule;
  }
}
