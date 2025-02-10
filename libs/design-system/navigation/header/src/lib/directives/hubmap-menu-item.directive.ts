import { Directive } from '@angular/core';
import { HubmapMenuItem } from '../types/hubmap-menu.schema';

@Directive({
  selector: 'ng-template[hraHubmapMenuItem]',
  standalone: true,
})
export class HubmapMenuItemDirective {
  static ngTemplateContextGuard(_dir: HubmapMenuItemDirective, _ctx: unknown): _ctx is { $implicit: HubmapMenuItem } {
    return true;
  }
}
