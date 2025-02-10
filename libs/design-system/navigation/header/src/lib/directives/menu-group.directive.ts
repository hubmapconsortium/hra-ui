import { Directive } from '@angular/core';
import { MenuGroup } from '../types/menus.schema';

@Directive({
  selector: 'ng-template[hraMenuGroup]',
  standalone: true,
})
export class MenuGroupDirective {
  static ngTemplateContextGuard(_dir: MenuGroupDirective, _ctx: unknown): _ctx is { $implicit: MenuGroup } {
    return true;
  }
}
