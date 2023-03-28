import { Inject, Provider } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { getActionTypeFromInstance, NgxsNextPluginFn, NgxsPlugin, NGXS_PLUGINS } from '@ngxs/store';

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

@Inject({
  providedIn: 'root',
})
export class StateAnalyticsPluginService implements NgxsPlugin {
  /**
   * Creates an instance of logger plugin.
   * @param ga
   */
  constructor(private readonly ga: GoogleAnalyticsService) {}

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

    if (type) {
      const payload = JSON.stringify(action, this.serialize);
      this.ga.event(type, payload);
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
