import { computed, Directive, effect, inject, input, output } from '@angular/core';
import { ConsentCategories, ConsentService } from '@hra-ui/common/analytics';
import { injectAssetHref, injectPageHref } from '@hra-ui/common/url';
import { PrivacyPreferencesService } from '@hra-ui/design-system/privacy';

import { AnalyticsInput } from './util/analytics-input';
import { createScreenSizeDetector } from './util/screen-size-detector';

/** Base application options */
export interface BaseApplicationOptions {
  /** Whether to show/hide the privacy preferences popups by default */
  analytics?: boolean;
  /** Whether to disable the screen size notice in the application */
  disableScreenSizeNotice?: boolean;
}

/**
 * Base component for all application
 */
@Directive({})
export abstract class BaseApplicationComponent {
  /** Asset base url */
  readonly assetHref = input<string>();
  /** Page base url */
  readonly pageHref = input<string>();

  /** Whether analytics is enabled/disabled or the specific analytics settings */
  readonly analytics = input(undefined, { transform: AnalyticsInput.parse });

  /** Emits when the user changes their consent settings */
  readonly consentChange = output<ConsentCategories>();

  /** Initialize the application component */
  constructor(options: BaseApplicationOptions = {}) {
    // Enable screen size notice
    if (!options.disableScreenSizeNotice) {
      createScreenSizeDetector();
    }

    // Setup hrefs
    const assetHref = injectAssetHref();
    effect(() => {
      const href = this.assetHref();
      if (href !== undefined) {
        assetHref.set(href);
      }
    });

    const pageHref = injectPageHref();
    effect(() => {
      const href = this.pageHref();
      if (href !== undefined) {
        pageHref.set(href);
      }
    });

    // Setup analytics
    const consent = inject(ConsentService);
    const privacyPreferences = inject(PrivacyPreferencesService);
    const analyticsWithDefault = computed(() => this.analytics() ?? options.analytics ?? true);

    effect(() => {
      const analytics = analyticsWithDefault();
      if (analytics === true) {
        privacyPreferences.launch();
      } else if (analytics) {
        consent.updateCategories(analytics);
      }
    });

    effect(() => {
      if (analyticsWithDefault() === true) {
        this.consentChange.emit(consent.categories());
      }
    });
  }
}
