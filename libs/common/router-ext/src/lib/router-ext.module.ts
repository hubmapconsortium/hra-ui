import { NgModule } from '@angular/core';
import { FragmentLinkDirective } from './fragment-link/fragment-link.directive';
import { LinkActiveDirective } from './link-active/link-active.directive';
import { LinkDirective } from './link/link.directive';

@NgModule({
  imports: [LinkActiveDirective, LinkDirective, FragmentLinkDirective],
  exports: [LinkActiveDirective, LinkDirective, FragmentLinkDirective],
})
export class RouterExtModule {}
