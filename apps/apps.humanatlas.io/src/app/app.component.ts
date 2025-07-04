import { CommonModule, ViewportScroller } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { monitorHeight } from '@hra-ui/common';
import { CustomScrollService } from '@hra-ui/common/custom-scroll';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { BreadcrumbItem } from '@hra-ui/design-system/buttons/breadcrumbs';
import { IconsModule } from '@hra-ui/design-system/icons';
import { NavigationModule } from '@hra-ui/design-system/navigation';
import { CtaConfig, HeaderComponent } from '@hra-ui/design-system/navigation/header';
import { isNavigating } from './utils/navigation';
import { routeData } from './utils/route-data';

/** Padding when scrolling to an anchor in px */
const ANCHOR_SCROLL_PADDING = 24;

/** Main application component */
@Component({
  selector: 'hra-apps',
  imports: [ButtonsModule, CommonModule, RouterModule, IconsModule, NavigationModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  host: {
    class: 'hra-app',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  /** Reference to the header html element */
  private readonly header = viewChild.required(HeaderComponent, { read: ElementRef });

  /**
   * Data for breadcrumbs in navigation header.
   */
  private readonly data = routeData();

  /**
   * Breadcrumbs data (computed from above signal).
   */
  protected readonly crumbs = computed(() => this.data()['crumbs'] as BreadcrumbItem[] | undefined);

  /** is user navigating to a different page */
  protected readonly isNavigating = isNavigating();

  /** Router instance for navigation */
  private readonly router = inject(Router);

  /** Call to action message */
  protected readonly cta: CtaConfig = {
    description: '🎉  9th Release (v2.3) has arrived!',
    action: 'Learn more',
    url: 'https://humanatlas.io/release-notes/v2.3',
  };

  /** Whether the CTA is dismissed or not */
  protected readonly ctaDismissed = signal(false);

  /** The height of the header given by the monitor */
  private readonly headerHeight = monitorHeight(this.header);

  /** Initialize the application */
  constructor() {
    inject(CustomScrollService);
    const scroller = inject(ViewportScroller);
    effect(() => {
      const yOffset = this.headerHeight() + ANCHOR_SCROLL_PADDING;
      scroller.setOffset([0, yOffset]);
    });
  }

  /** Help data for the current route */
  getHelpUrl(): string {
    const currentRouteData = this.data();
    if (currentRouteData && currentRouteData['helpUrl']) {
      return currentRouteData['helpUrl'] as string;
    }
    return `https://humanatlas.io${this.router.url}`;
  }
}
