import { Directive } from '@angular/core';
import { MenuItem } from '../types/menus.schema';

@Directive({
  selector: 'ng-template[hraMenuItem]',
  standalone: true,
})
export class MenuItemDirective {
  static ngTemplateContextGuard(_dir: MenuItemDirective, _ctx: unknown): _ctx is { $implicit: MenuItem } {
    return true;
  }
}
