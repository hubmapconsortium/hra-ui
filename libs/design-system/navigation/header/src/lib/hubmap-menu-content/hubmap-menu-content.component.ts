import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Directive, input } from '@angular/core';
import { AssetUrlPipe } from '@hra-ui/cdk/app-href';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { HubmapMenu, HubmapMenuGroup, HubmapMenuItem } from '../types/hubmap-menu.schema';

@Directive({
  selector: 'ng-template[hraHubmapMenuGroup]',
  standalone: true,
})
export class HubmapMenuGroupDirective {
  static ngTemplateContextGuard(_dir: HubmapMenuGroupDirective, _ctx: unknown): _ctx is { $implicit: HubmapMenuGroup } {
    return true;
  }
}

@Directive({
  selector: 'ng-template[hraHubmapMenuItem]',
  standalone: true,
})
export class HubmapMenuItemDirective {
  static ngTemplateContextGuard(_dir: HubmapMenuItemDirective, _ctx: unknown): _ctx is { $implicit: HubmapMenuItem } {
    return true;
  }
}

@Component({
  selector: 'hra-hubmap-menu-content',
  standalone: true,
  imports: [CommonModule, AssetUrlPipe, ButtonsModule, HubmapMenuGroupDirective, HubmapMenuItemDirective],
  templateUrl: './hubmap-menu-content.component.html',
  styleUrl: './hubmap-menu-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HubmapMenuContentComponent {
  readonly menu = input.required<HubmapMenu>();
}
