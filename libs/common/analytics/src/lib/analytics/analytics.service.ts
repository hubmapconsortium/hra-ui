import { assertInInjectionContext, inject, Injectable, isDevMode } from '@angular/core';
import { AnalyticsEvent, EventPayloadFor } from '@hra-ui/common/analytics/events';
import { hraAnalyticsPlugin } from '@hra-ui/common/analytics/plugins/hra-analytics';
import { hraEventFilterPlugin } from '@hra-ui/common/analytics/plugins/hra-event-filter';
import { injectAppConfiguration } from '@hra-ui/common/injectors';
import { Analytics, AnalyticsPlugin, PageData } from 'analytics';
import { nanoid } from 'nanoid';
import { createNoopInjectionToken } from 'ngxtension/create-injection-token';
import store from 'store2';
import { ConsentService } from '../consent/consent.service';
import { injectFeaturePath } from '../feature/feature.directive';

/** Extended `Analytics` options */
type ExtendedAnalyticsOptions = Parameters<typeof Analytics>[0] & {
  storage?: null;
};

/** Storage key for session id */
const SESSION_ID_STORAGE_KEY = '__hra-analytics-session-id';

/** User defined `analytics` plugins */
const PLUGINS = createNoopInjectionToken<AnalyticsPlugin, true>('Analytics plugins', {
  multi: true,
});

/** Inject all user defined `analytics` plugins */
const injectPlugins = PLUGINS[0];
/** Provide an user defined `analytics` plugin */
export const providePlugin = PLUGINS[1];

/**
 * Injects a functional equivalent of `AnalyticsService.logEvent`
 * for ease of use in components/directive/etc.
 * The function also automatically adds the feature path to the event props on each call.
 *
 * @returns A function to log events
 */
export function injectLogEvent(): <T extends AnalyticsEvent>(event: T, props: EventPayloadFor<T>) => void {
  assertInInjectionContext(injectLogEvent);
  const analytics = inject(AnalyticsService);
  const path = injectFeaturePath();
  return (event, props) => analytics.logEvent(event, { path: path(), ...props });
}

/**
 * Service wrapping `analytics`
 */
@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  /** Application configuration */
  private readonly appConfig = injectAppConfiguration();

  /** Application specific `analytics` plugins */
  private readonly plugins = injectPlugins({ optional: true }) ?? [];

  /** User consent settings */
  private readonly consent = inject(ConsentService);

  /** `analytics` instance */
  private readonly instance = Analytics({
    app: this.appConfig.name,
    version: this.appConfig.version,
    debug: isDevMode(),
    storage: null, // Disable localStorage
    plugins: [
      hraEventFilterPlugin({
        isEventEnabled: (type, category) => this.consent.isEventEnabled(type, category),
      }),
      hraAnalyticsPlugin({
        sessionId: this.getSessionId(),
      }),
      ...this.plugins,
    ],
  } as ExtendedAnalyticsOptions);

  /**
   * Logs a page view to analytics
   *
   * @param data Additional page data
   */
  logPageView(data?: PageData): void {
    this.instance.page(data);
  }

  /**
   * Logs an event to analytics
   *
   * @param event Event to log
   * @param props Event data
   */
  logEvent<T extends AnalyticsEvent>(event: T, props: EventPayloadFor<T>): void {
    const { type, category } = event;
    this.instance.track(type, props, { eventObj: event, category });
  }

  /**
   * Retrieves or creates a session id
   *
   * @returns A session id
   */
  private getSessionId(): string {
    let id = store.session.get(SESSION_ID_STORAGE_KEY);
    if (!id || typeof id !== 'string') {
      id = nanoid(10);
      store.session.set(SESSION_ID_STORAGE_KEY, id);
    }

    return id;
  }
}
