import { NgModule } from '@angular/core';
import { FragmentLinkDirective } from './fragment-link/fragment-link.directive';
import { LinkDirective } from './link/link.directive';

@NgModule({
  imports: [LinkDirective, FragmentLinkDirective],
  exports: [LinkDirective, FragmentLinkDirective],
})
export class RouterExtModule {}
