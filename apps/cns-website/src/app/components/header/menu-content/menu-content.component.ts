import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, Directive, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule, UrlTree } from '@angular/router';
import { isAbsolute as isAbsoluteUrl } from '@hra-ui/common/url';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { Menu, MenuGroup } from '../types/menus.schema';
import { HraCommonModule } from '@hra-ui/common';
import { MatDividerModule } from '@angular/material/divider';

/** Display modes of the menu content component */
export type MenuContentVariant = 'desktop' | 'mobile';

/** Directive used to type the context for menu group templates */
@Directive({
  selector: 'ng-template[cnsMenuGroup]',
  standalone: true,
})
export class MenuGroupDirective {
  /** Types the context as `MenuGroup` */
  /* istanbul ignore next */
  static ngTemplateContextGuard(_dir: MenuGroupDirective, _ctx: unknown): _ctx is { $implicit: MenuGroup } {
    return true;
  }
}

/**
 * Displays the menu for mobile screens
 */
@Component({
  selector: 'cns-menu-content',
  imports: [HraCommonModule, RouterModule, MatIconModule, ButtonsModule, MenuGroupDirective, MatDividerModule],
  templateUrl: './menu-content.component.html',
  styleUrl: './menu-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuContentComponent {
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
  resolveUrl(url: string, forceExternal = false): { isAbsolute: boolean; value: string | UrlTree } {
    const { router } = this;
    const baseUrl = Location.stripTrailingSlash(this.baseUrl() ?? '') + '/';
    let isAbsolute = forceExternal || isAbsoluteUrl(url);
    if (!forceExternal && baseUrl && url.startsWith(baseUrl)) {
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
