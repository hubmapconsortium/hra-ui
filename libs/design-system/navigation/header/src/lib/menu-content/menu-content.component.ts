import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Directive, input } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { Menu, MenuGroup, MenuItem, MenuSubGroup } from '../types/menus.schema';

export type MenuContentVariant = 'desktop' | 'mobile';

@Directive({
  selector: 'ng-template[hraMenuGroup]',
  standalone: true,
})
export class MenuGroupDirective {
  static ngTemplateContextGuard(_dir: MenuGroupDirective, _ctx: unknown): _ctx is { $implicit: MenuGroup } {
    return true;
  }
}

@Directive({
  selector: 'ng-template[hraMenuItem]',
  standalone: true,
})
export class MenuItemDirective {
  static ngTemplateContextGuard(_dir: MenuItemDirective, _ctx: unknown): _ctx is { $implicit: MenuItem } {
    return true;
  }
}

@Directive({
  selector: 'ng-template[hraMenuSubGroup]',
  standalone: true,
})
export class MenuSubGroupDirective {
  static ngTemplateContextGuard(_dir: MenuSubGroupDirective, _ctx: unknown): _ctx is { $implicit: MenuSubGroup } {
    return true;
  }
}

@Component({
  selector: 'hra-menu-content',
  standalone: true,
  imports: [
    CommonModule,
    MatDivider,
    MatIconModule,
    ButtonsModule,
    MenuGroupDirective,
    MenuItemDirective,
    MenuSubGroupDirective,
  ],
  templateUrl: './menu-content.component.html',
  styleUrl: './menu-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '"menu-content-variant-" + variant()',
  },
})
export class MenuContentComponent {
  readonly variant = input.required<MenuContentVariant>();
  readonly menu = input.required<Menu>();
}
