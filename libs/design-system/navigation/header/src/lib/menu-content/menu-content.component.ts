import { CommonModule, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, Directive, inject, input } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule, UrlTree } from '@angular/router';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { Menu, MenuGroup, MenuItem, MenuSubGroup } from '../types/menus.schema';

/** Display modes of the menu content component */
export type MenuContentVariant = 'desktop' | 'mobile';

/** Directive used to type the context for menu group templates */
@Directive({
  selector: 'ng-template[hraMenuGroup]',
  standalone: true,
})
export class MenuGroupDirective {
  /** Types the context as `MenuGroup` */
  /* istanbul ignore next */
  static ngTemplateContextGuard(_dir: MenuGroupDirective, _ctx: unknown): _ctx is { $implicit: MenuGroup } {
    return true;
  }
}

/** Directive used to type the context for menu item templates */
@Directive({
  selector: 'ng-template[hraMenuItem]',
  standalone: true,
})
export class MenuItemDirective {
  /** Types the context as `MenuItem` */
  /* istanbul ignore next */
  static ngTemplateContextGuard(_dir: MenuItemDirective, _ctx: unknown): _ctx is { $implicit: MenuItem } {
    return true;
  }
}

/** Directive used to type the context for menu subgroup templates */
@Directive({
  selector: 'ng-template[hraMenuSubGroup]',
  standalone: true,
})
export class MenuSubGroupDirective {
  /** Types the context as `MenuSubGroup` */
  /* istanbul ignore next */
  static ngTemplateContextGuard(_dir: MenuSubGroupDirective, _ctx: unknown): _ctx is { $implicit: MenuSubGroup } {
    return true;
  }
}

/**
 * Displays the content of a menu.
 * Has variants for both mobile and desktop size screens.
 */
@Component({
  selector: 'hra-menu-content',
  imports: [
    CommonModule,
    RouterModule,
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
  /** Display mode */
  readonly variant = input.required<MenuContentVariant>();
  /** Menu data to display */
  readonly menu = input.required<Menu>();
  /** Base url - Menu urls starting with this will be converted into router links */
  readonly baseUrl = input.required<string | undefined>();

  /** Reference to the router if available */
  private readonly router = inject(Router, { optional: true });

  /**
   * Resolves an url against the baseUrl
   *
   * @param url Raw url
   * @returns Whether the url is absolute along with the resolved url
   */
  resolveUrl(url: string): { isAbsolute: boolean; value: string | UrlTree } {
    const { router } = this;
    const baseUrl = Location.stripTrailingSlash(this.baseUrl() ?? '');
    let isAbsolute = url.startsWith('http');
    if (baseUrl && url.startsWith(baseUrl)) {
      isAbsolute = false;
      url = url.slice(baseUrl.length);
    }

    let value: string | UrlTree = url;
    if (!isAbsolute && router) {
      value = router.parseUrl(Location.stripTrailingSlash(url));
    }

    return { isAbsolute, value };
  }
}
