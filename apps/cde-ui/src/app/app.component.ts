import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, computed, inject, viewChild } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { BaseApplicationComponent } from '@hra-ui/application';
import { HraCommonModule } from '@hra-ui/common';
import { CustomScrollService } from '@hra-ui/common/custom-scroll';
import { LinkDirective } from '@hra-ui/common/router-ext';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { NavigationModule } from '@hra-ui/design-system/navigation';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { createNotifier } from 'ngxtension/create-notifier';
import { CRUMBS_DATA_KEY, removeLastCrumbRoute, ROOT_CRUMBS } from './shared/resolvers/crumbs.resolver';
import { getOptionalRouteData } from './shared/utils/route-properties';
import { Breakpoints, watchBreakpoint } from '@hra-ui/cdk/breakpoints';
import { ThemePreference, ThemeService } from './services/theme-service/theme.service';

/** A choice in the header's theme menu */
interface ThemeOption {
  /** Theme menu choice */
  id: ThemePreference;
  /** Menu item label */
  label: string;
  /** Icon the theme menu button shows while this choice is on */
  icon: string;
}

/** Theme menu choices, matching the visualization toolbar's Theme menu */
const THEME_OPTIONS: ThemeOption[] = [
  { id: 'system', label: 'System settings', icon: 'brightness_4' },
  { id: 'light', label: 'Light theme', icon: 'light_mode' },
  { id: 'dark', label: 'Dark theme', icon: 'dark_mode' },
];

/**
 * App component for CDE
 */
@Component({
  selector: 'cde-ui',
  imports: [
    RouterOutlet,
    RouterModule,
    MatIconModule,
    NavigationModule,
    ButtonsModule,
    PlainTooltipDirective,
    MatMenuModule,
    MatDividerModule,
    CommonModule,
    HraCommonModule,
    LinkDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  host: {
    class: 'hra-app',
  },
})
export class AppComponent extends BaseApplicationComponent {
  /** Router outlet reference */
  private readonly outlet = viewChild.required(RouterOutlet);
  /** Notifies when the content of the router outlet changes */
  protected readonly outletChanged = createNotifier();
  /** Snapshot of currently activated route */
  private readonly activatedRouteSnapshot = computed(() => {
    const outlet = this.outlet();
    this.outletChanged.listen();
    if (!outlet.isActivated) {
      return undefined;
    }

    return outlet.activatedRoute.snapshot;
  });

  /** Whether the screen size is considered small (mobile) */
  private readonly isSmallScreen = watchBreakpoint(Breakpoints.Mobile);

  /** Light and dark theme switcher */
  protected readonly themeService = inject(ThemeService);

  /** Theme menu choices */
  protected readonly themeOptions = THEME_OPTIONS;

  /** Icon of the theme menu button, showing the current choice */
  protected readonly themeIcon = computed(
    () => THEME_OPTIONS.find((option) => option.id === this.themeService.preference())?.icon ?? 'brightness_4',
  );

  /** Computed breadcrumbs for the current route */
  protected readonly crumbs = computed(() => {
    if (this.isSmallScreen()) {
      return [];
    }

    const route = this.activatedRouteSnapshot();
    if (!route) {
      return ROOT_CRUMBS;
    }

    const isErrorPage = getOptionalRouteData(route, 'isErrorPage', false, true);
    if (isErrorPage) {
      return ROOT_CRUMBS;
    }

    const crumbs = getOptionalRouteData(route, CRUMBS_DATA_KEY, ROOT_CRUMBS, true);
    return removeLastCrumbRoute(crumbs);
  });

  /** Initialize app */
  constructor() {
    super({ screenSizeNotice: { width: 1280, height: 832 } });

    inject(CustomScrollService);
    inject(Router).initialNavigation();

    const scroller = inject(ViewportScroller);
    scroller.setOffset([0, 113 + 24]);
  }
}
