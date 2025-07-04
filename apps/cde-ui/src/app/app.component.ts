import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

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
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  host: {
    class: 'hra-app',
  },
})
export class AppComponent {
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
