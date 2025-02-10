import { Directive } from '@angular/core';
import { MenuSubGroup } from '../types/menus.schema';

@Directive({
  selector: 'ng-template[hraMenuSubGroup]',
  standalone: true,
})
export class MenuSubGroupDirective {
  static ngTemplateContextGuard(_dir: MenuSubGroupDirective, _ctx: unknown): _ctx is { $implicit: MenuSubGroup } {
    return true;
  }
}
