import { NgModule } from '@angular/core';
import { AppLinkDirective } from './app-link/app-link.directive';

@NgModule({
  imports: [AppLinkDirective],
  exports: [AppLinkDirective],
})
export class RouterExtModule {}
