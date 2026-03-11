import { Injectable, isDevMode } from '@angular/core';
import { createInjectionToken } from 'ngxtension/create-injection-token';
import { stringify } from 'qs';
import { safeTruncateQueryString } from '../util/safe-truncate';
import { serialize } from '../util/serialize';

/**
 * A telemetry parameter filter that is applied to each query parameter during serialization.
 * Can be used to both remove query parameters or to apply custom serialization logic to specific parameters.
 */
export type TelemetryParameterFilter = (prefix: string, value: unknown) => unknown;

/**
 * Options for the TelemetryService, which can be provided via dependency injection.
 *
 * @see {@link provideTelemetryOptions}
 */
export interface TelemetryOptions {
  /** The endpoint to which telemetry data is sent */
  endpoint?: string;
  /** Query parameter filters to apply */
  filters?: TelemetryParameterFilter[];
  /** Maximum length of each query string sent to the endpoint */
  maxQueryLength?: number;
  /** Suffix appended to query parameters that have been truncated in order to fit the maximum query length */
  truncatedSuffix?: string;
}

/** DI token for telemetry options */
const OPTIONS_TOKEN = createInjectionToken((): TelemetryOptions => ({}));

/** Injects telemetry options provided via dependency injection. */
export const injectTelemetryOptions = OPTIONS_TOKEN[0];
/**
 * Provides telemetry options for the TelemetryService via dependency injection.
 * Can be used to override default options such as the endpoint URL, or to provide custom filters for telemetry data.
 *
 * @see {@link TelemetryOptions}
 */
export const provideTelemetryOptions = OPTIONS_TOKEN[1];

/**
 * DI token for fetch implementation.
 * Used to override the default fetch implementation during testing
 */
const FETCH_IMPL_TOKEN = createInjectionToken(() => ({ fetch }));

/** Injects the fetch implementation */
export const injectFetchImpl = FETCH_IMPL_TOKEN[0];
/** Provide a different fetch implementation */
export const provideFetchImpl = FETCH_IMPL_TOKEN[1];

/**
 * Telemetry service responsible for sending analytics data to the HRA analytics endpoint
 */
@Injectable({
  providedIn: 'root',
})
export class TelemetryService {
  /** Telemetry options */
  readonly options = {
    endpoint: `https://cdn.humanatlas.io/tr${isDevMode() ? '-dev' : ''}`,
    filters: [],
    maxQueryLength: 7000,
    ...injectTelemetryOptions(),
  };

  /** Fetch implementation */
  private readonly fetchImpl = injectFetchImpl();

  /**
   * Sends telemetry data to the endpoint.
   *
   * @param data Data to send
   */
  send(data: object): void {
    const queryString = this.serializeQueryParameters(data);
    this.fetchImpl
      .fetch(`${this.options.endpoint}?${queryString}`, {
        method: 'GET',
        cache: 'no-store',
        keepalive: true,
      })
      .catch((error) => {
        if (isDevMode()) {
          // eslint-disable-next-line no-console
          console.error('Failed to send telemetry data', error);
        }
      });
  }

  /**
   * Serializes telemetry data into a query string,
   * applying filters and truncating as necessary to fit within the maximum query length.
   *
   * @param data Telemetry data to serialize
   * @returns A query string to be sent to the telemetry endpoint
   */
  private serializeQueryParameters(data: object): string {
    const { maxQueryLength, truncatedSuffix } = this.options;
    const queryString = stringify(data, {
      allowDots: true,
      arrayFormat: 'indices',
      skipNulls: true,
      filter: (prefix, value) => serialize(this.applyFilters(prefix, value)),
    });

    return safeTruncateQueryString(queryString, maxQueryLength, { suffix: truncatedSuffix });
  }

  /**
   * Applies user-defined filters when serializing telemetry data.
   * Each filter is applied sequentially, and shortcircuits as soon as a filter returns a new value.
   *
   * @param prefix Query parameter key prefix, e.g. "user.id" or "page.url"
   * @param value Unserialized value to be sent for this query parameter
   * @returns The filtered value, or the original value if no filters apply
   */
  private applyFilters(prefix: string, value: unknown): unknown {
    for (const filter of this.options.filters) {
      const result = filter(prefix, value);
      if (result !== value) {
        return result;
      }
    }

    return value;
  }
}
