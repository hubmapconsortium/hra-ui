import { Directive } from '@angular/core';
import { MenuDivider } from '../types/menus.schema';

@Directive({
  selector: 'ng-template[hraMenuDivider]',
  standalone: true,
})
export class MenuDividerDirective {
  static ngTemplateContextGuard(_dir: MenuDividerDirective, _ctx: unknown): _ctx is { $implicit: MenuDivider } {
    return true;
  }
}
