import { NgModule } from '@angular/core';
import {
  MenuDividerDirective,
  MenuGroupDirective,
  MenuItemDirective,
  MenuObjectOutletDirective,
  MenuSubGroupDirective,
} from './menu-renderer.directive';

const REEXPORTS = [
  MenuObjectOutletDirective,
  MenuDividerDirective,
  MenuGroupDirective,
  MenuItemDirective,
  MenuSubGroupDirective,
];

@NgModule({
  imports: REEXPORTS,
  exports: REEXPORTS,
})
export class MenuRendererModule {}
