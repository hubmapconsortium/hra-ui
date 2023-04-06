import { inject, Injectable, InjectionToken, Provider } from '@angular/core';
import { getActionTypeFromInstance, NgxsNextPluginFn, NgxsPlugin, NGXS_PLUGINS } from '@ngxs/store';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { DEFAULT_LOGGABLE_ACTIONS } from './default-loggable-actions';

/** Primitive types */
const PRIMITIVE_TYPES = ['bigint', 'boolean', 'number', 'string'];

/**
 * Determines whether primitive is
 * @param value
 * @returns primitive
 */
function isPrimitive(value: unknown): value is bigint | boolean | number | string | null | undefined {
  return value == null || PRIMITIVE_TYPES.includes(typeof value);
}

/**
 * Injectable token LOGGABLE_ACTIONS provides list of actions that can be logged
 */
export const LOGGABLE_ACTIONS = new InjectionToken<unknown[]>('Loggable actions', {
  providedIn: 'root',
  factory: () => DEFAULT_LOGGABLE_ACTIONS,
});

/**
 * Google Analytics Plugin Injectable
 */
@Injectable({
  providedIn: 'root',
})
export class StateAnalyticsPluginService implements NgxsPlugin {
  /**
   * Injects the service for state analytics plugin.
   */
  private readonly ga = inject(GoogleAnalyticsService);

  /**
   * Plugin service for logging state analytics
   * Setting loggable action types from LOGGABLE_ACTIONS dependency.
   */
  private readonly loggableTypes = new Set(inject(LOGGABLE_ACTIONS).map(getActionTypeFromInstance));

  /**
   * Handles logger plugin
   * @param state
   * @param action
   * @param next
   * @returns
   */
  handle(state: unknown, action: unknown, next: NgxsNextPluginFn) {
    this.logAction(action);
    return next(state, action);
  }

  /**
   * Logs action trigerred to google analytics event
   * @param action
   * @returns action
   */
  private logAction(action: unknown): void {
    const type = getActionTypeFromInstance(action);
    if (type && this.loggableTypes.has(type)) {
      const payload = JSON.stringify(action, this.serialize);
      this.ga.event(type, 'action_log', payload);
    }
  }

  /**
   * Serializes action data
   * @param this
   * @param key
   * @param value
   * @returns serialize
   */
  private serialize(this: void, key: unknown, value: unknown): unknown {
    if (key === '' && typeof value === 'object') {
      return { ...value, type: undefined };
    } else if (isPrimitive(value) || (Array.isArray(value) && value.every(isPrimitive))) {
      return value;
    }

    return undefined;
  }
}

/**
 * State Login Provider
 */
export const STATE_LOGGER_PROVIDER: Provider = {
  provide: NGXS_PLUGINS,
  useClass: StateAnalyticsPluginService,
  multi: true,
};
