import { coerceElement } from '@angular/cdk/coercion';
import { ViewportScroller } from '@angular/common';
import { Component, effect, ElementRef, inject, Signal, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { EventType, Router, RouterModule } from '@angular/router';
import { CustomScrollService } from '@hra-ui/common/custom-scroll';
import { NavigationModule } from '@hra-ui/design-system/navigation';
import { HeaderComponent } from '@hra-ui/design-system/navigation/header';
import { DOCS_NAVIGATION_MENU } from '@hra-ui/design-system/navigation/site-navigation';
import { filter, map } from 'rxjs';

/** Padding when scrolling to an anchor in px */
const ANCHOR_SCROLL_PADDING = 24;

/**
 * Root component
 */
@Component({
  selector: 'hra-portal',
  imports: [RouterModule, NavigationModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    class: 'hra-app',
  },
})
export class AppComponent {
  /** Reference to the header html element */
  private readonly header = viewChild.required(HeaderComponent, { read: ElementRef });

  /** Navigation menu for the application */
  protected readonly navigationMenu = DOCS_NAVIGATION_MENU;

  private readonly router = inject(Router);

  readonly routePath = this.currentRoutePath();

  protected isNavigationVisible = true;

  /** Initialize the application */
  constructor() {
    const scrollService = inject(CustomScrollService);
    const scroller = inject(ViewportScroller);
    effect(() => {
      // Compute and set the scroll Y-offset to be the header height + padding
      const el = coerceElement<Element>(this.header());
      const { height } = el.getBoundingClientRect();
      const yOffset = height + ANCHOR_SCROLL_PADDING;
      scroller.setOffset([0, yOffset]);
    });

    effect(() => {
      const routerUrl = this.routePath();
      if (routerUrl === '/') {
        this.isNavigationVisible = false;
      } else {
        this.isNavigationVisible = true;
      }
    });
  }

  currentRoutePath(): Signal<string> {
    const route$ = this.router.events.pipe(
      filter((event) => event.type === EventType.NavigationEnd),
      map((event) => event.urlAfterRedirects),
    );

    return toSignal(route$, { initialValue: this.router.url });
  }
}
