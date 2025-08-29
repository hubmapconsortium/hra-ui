import { Component, computed, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NavigationModule } from '@hra-ui/design-system/navigation';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { routeData } from '@hra-ui/common';
import { BreadcrumbItem } from '@hra-ui/design-system/buttons/breadcrumbs';

import { ScreenSizeNoticeComponent } from './components/screen-size-notice/screen-size-notice.component';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';

import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';

/** Max width to show screen size notice */
export const SCREEN_SIZE_NOTICE_MAX_WIDTH = 1280;
/** Max height to show screen size notice */
export const SCREEN_SIZE_NOTICE_MAX_HEIGHT = 832;

/**
 * App component for CDE
 */
@Component({
  selector: 'cde-root',
  imports: [
    RouterOutlet,
    MatIconModule,
    NavigationModule,
    ButtonsModule,
    PlainTooltipDirective,
    MatMenuModule,
    MatDividerModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  host: {
    class: 'hra-app',
  },
})
export class AppComponent {
  private readonly data = routeData();

  protected readonly crumbs = computed(() => this.data()['crumbs'] as BreadcrumbItem[] | undefined);
  /**
   * Screen size notice detector of app component
   */
  protected readonly screenSizeNoticeDetector = ScreenSizeNoticeComponent.createDetector({
    width: SCREEN_SIZE_NOTICE_MAX_WIDTH,
    height: SCREEN_SIZE_NOTICE_MAX_HEIGHT,
  });

  /** Initialize app */
  constructor() {
    inject(Router).initialNavigation();
  }
}
