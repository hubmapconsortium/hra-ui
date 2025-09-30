import { computed, Directive, effect, inject, input, output, signal } from '@angular/core';
import { ConsentCategories, ConsentService } from '@hra-ui/common/analytics';
import { provideChainedAssetHref, provideChainedPageHref } from '@hra-ui/common/url';
import { createInjectionToken } from 'ngxtension/create-injection-token';
import { AnalyticsInput } from './util/analytics-input';

/** Base application options */
export interface BaseApplicationOptions {
  /** Whether to show/hide the privacy preferences popups by default */
  analytics?: boolean;
}

/**
 * Token used to reference the app instance from {@link BaseApplicationDirective}.
 * Used to work around a bug with host directive inputs.
 * @see {@link BaseApplicationDirective}
 */
const APP_INSTANCE = createInjectionToken(() => signal<BaseApplicationComponent | undefined>(undefined), {
  isRoot: false,
});

/** Inject the app instance */
const injectAppInstance = APP_INSTANCE[0];
/** Provide the app instance */
const provideAppInstance = APP_INSTANCE[1];

/**
 * Base directive for all applications.
 *
 * NOTE: At the moment extend from {@link BaseApplicationComponent} instead of using this as a host directive.
 * This is due to a [bug](https://github.com/angular/angular/issues/53193) with host directive's inputs
 * not being reflected in the component metadata.
 */
@Directive({
  providers: [
    provideAppInstance(),
    provideChainedAssetHref(() => {
      const instance = injectAppInstance();
      return computed(() => instance()?.assetHref());
    }),
    provideChainedPageHref(() => {
      const instance = injectAppInstance();
      return computed(() => instance()?.pageHref());
    }),
  ],
})
export class BaseApplicationDirective {}

/**
 * Base component for all application
 */
@Directive({
  hostDirectives: [BaseApplicationDirective],
})
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
    injectAppInstance().set(this);

    const consent = inject(ConsentService);
    const analyticsWithDefault = computed(() => this.analytics() ?? options.analytics ?? true);

    effect(() => {
      const analytics = analyticsWithDefault();
      if (analytics === true) {
        // TODO: Launch preferences
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
