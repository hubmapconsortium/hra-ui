import { ChangeDetectionStrategy, Component, Directive, input } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { HubmapMenuGroup, HubmapMenuItem } from '../types/hubmap-menu.schema';

/** Directive used to type the context for menu group templates */
@Directive({
  selector: 'ng-template[hraHubmapMenuGroup]',
  standalone: true,
})
export class HubmapMenuGroupDirective {
  /** Types the context as `HubmapMenuGroup` */
  /* istanbul ignore next */
  static ngTemplateContextGuard(_dir: HubmapMenuGroupDirective, _ctx: unknown): _ctx is { $implicit: HubmapMenuGroup } {
    return true;
  }
}

/** Directive used to type the context for menu item templates */
@Directive({
  selector: 'ng-template[hraHubmapMenuItem]',
  standalone: true,
})
export class HubmapMenuItemDirective {
  /** Types the context as `HubmapMenuItem` */
  /* istanbul ignore next */
  static ngTemplateContextGuard(_dir: HubmapMenuItemDirective, _ctx: unknown): _ctx is { $implicit: HubmapMenuItem } {
    return true;
  }
}

/**
 * Displays the content of a hubmap menu.
 * Works for both mobile and desktop size screens.
 */
@Component({
  selector: 'hra-hubmap-menu-content',
  imports: [HraCommonModule, ButtonsModule, HubmapMenuGroupDirective, HubmapMenuItemDirective],
  templateUrl: './hubmap-menu-content.component.html',
  styleUrl: './hubmap-menu-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HubmapMenuContentComponent {
  /** Menu data to display */
  readonly menu = input.required<HubmapMenuGroup[]>();
}
