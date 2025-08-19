import { assertInInjectionContext, inject, Injectable, InjectionToken, isDevMode } from '@angular/core';
import { AnalyticsEvent, EventPayloadFor, CoreEvents } from '@hra-ui/common/analytics/events';
import { hraAnalyticsPlugin } from '@hra-ui/common/analytics/plugins/hra-analytics';
import { injectAppConfiguration } from '@hra-ui/common/injectors';
import { Analytics, AnalyticsPlugin } from 'analytics';
import { injectFeaturePath } from './feature/feature.directive';

/** Plugins token */
export const PLUGINS = new InjectionToken<(AnalyticsPlugin | (() => AnalyticsPlugin))[][]>('Plugins');

/**
 * Injects a functional equivalent of `AnalyticsService.logEvent`
 * for ease of use in components/directive/etc.
 * The function also automatically adds the feature path to the event props on each call.
 *
 * @returns A function that log events on calls
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

  /** `analytics` instance. Direct use should generally be avoided. */
  readonly instance = Analytics({
    app: this.appConfig.name,
    version: this.appConfig.version,
    debug: isDevMode(),
    plugins: [hraAnalyticsPlugin(), ...this.injectPlugins()],
  });

  /**
   * Logs an event to analytics
   *
   * @param event Event to log
   * @param props Event data
   */
  logEvent<T extends AnalyticsEvent>(event: T, props: EventPayloadFor<T>): void {
    this.instance.track(event.type, props).catch((reason) => {
      if (event.type === CoreEvents.Error.type) {
        // eslint-disable-next-line no-console -- Fall back to console if analytics failed to log
        console.error('Failed to log error [reason, props]: ', reason, props);
        return;
      }

      this.logEvent(CoreEvents.Error, {
        message: `Failed to log event '${event}'`,
        context: props,
        reason: reason,
      });
    });
  }

  /**
   * Injects user provided plugins.
   * Plugin factories are run in this service's injection context.
   *
   * @returns Array of `analytics` plugins
   */
  private injectPlugins(): AnalyticsPlugin[] {
    const plugins = inject(PLUGINS, { optional: true }) ?? [];
    return plugins.flat().map((plugin) => (typeof plugin === 'function' ? plugin() : plugin));
  }
}
