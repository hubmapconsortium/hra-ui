import { coerceElement } from '@angular/cdk/coercion';
import { ViewportScroller } from '@angular/common';
import { Component, effect, ElementRef, inject, viewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationModule } from '@hra-ui/design-system/navigation';
import { HeaderComponent } from '@hra-ui/design-system/navigation/header';
import { CustomScrollService } from '@hra-ui/common/custom-scroll';

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
  }
}
