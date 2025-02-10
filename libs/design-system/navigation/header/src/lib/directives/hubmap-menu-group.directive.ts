import { Directive } from '@angular/core';
import { HubmapMenuGroup } from '../types/hubmap-menu.schema';

@Directive({
  selector: 'ng-template[hraHubmapMenuGroup]',
  standalone: true,
})
export class HubmapMenuGroupDirective {
  static ngTemplateContextGuard(_dir: HubmapMenuGroupDirective, _ctx: unknown): _ctx is { $implicit: HubmapMenuGroup } {
    return true;
  }
}
