import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { BaseApplicationComponent } from '@hra-ui/application';
import { HraCommonModule, routeData } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { NavigationModule } from '@hra-ui/design-system/navigation';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { ScreenSizeNoticeComponent } from './components/screen-size-notice/screen-size-notice.component';

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
    RouterModule,
    MatIconModule,
    NavigationModule,
    ButtonsModule,
    PlainTooltipDirective,
    MatMenuModule,
    MatDividerModule,
    CommonModule,
    HraCommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  host: {
    class: 'hra-app',
  },
})
export class AppComponent extends BaseApplicationComponent {
  /**
   * Route data of app component
   */
  private readonly data = routeData();

  /** Breadcrumbs data (computed from above signal). */
  protected readonly crumbs = computed(() => {
    if (this.data()['data']) {
      return this.data()['crumbs'].concat([{ name: this.data()['data'].metadata.sourceFileName }]);
    }
    return this.data()['crumbs'];
  });

  /** Header visibility (whether to show header or not) */
  protected readonly header = computed(() => this.data()['header'] as boolean | undefined);

  /**
   * Screen size notice detector of app component
   */
  protected readonly screenSizeNoticeDetector = ScreenSizeNoticeComponent.createDetector({
    width: SCREEN_SIZE_NOTICE_MAX_WIDTH,
    height: SCREEN_SIZE_NOTICE_MAX_HEIGHT,
  });

  /** Initialize app */
  constructor() {
    super();
    inject(Router).initialNavigation();
  }
}
