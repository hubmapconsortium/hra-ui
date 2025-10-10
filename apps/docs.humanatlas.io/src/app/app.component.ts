import { ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, signal, viewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BaseApplicationComponent } from '@hra-ui/application';
import { HraCommonModule, monitorHeight } from '@hra-ui/common';
import { CustomScrollService } from '@hra-ui/common/custom-scroll';
import { NavigationModule } from '@hra-ui/design-system/navigation';
import { CtaConfig, HeaderComponent } from '@hra-ui/design-system/navigation/header';

/** Padding when scrolling to an anchor in px */
const ANCHOR_SCROLL_PADDING = 24;

/**
 * Main application component for docs
 */
@Component({
  selector: 'hra-docs',
  imports: [HraCommonModule, RouterModule, NavigationModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  host: {
    class: 'hra-app',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent extends BaseApplicationComponent {
  /** Reference to the header html element */
  private readonly header = viewChild.required(HeaderComponent, { read: ElementRef });

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
    super();

    inject(CustomScrollService);
    const scroller = inject(ViewportScroller);

    effect(() => {
      const yOffset = this.headerHeight() + ANCHOR_SCROLL_PADDING;
      scroller.setOffset([0, yOffset]);
    });
  }
}
