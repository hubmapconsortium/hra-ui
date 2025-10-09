import { Injectable } from '@angular/core';
import { stringify } from 'qs';
import { serialize } from '../util/serialize';
import { injectTelemetryEndpoint, injectTelemetryParameterFilters } from './telemetry.tokens';

/**
 * Telemetry service responsible for sending analytics data to the HRA analytics endpoint
 */
@Injectable({
  providedIn: 'root',
})
export class TelemetryService {
  /** Endpoint url */
  private readonly endpoint = injectTelemetryEndpoint();
  /** Parameter filters */
  private readonly filters = injectTelemetryParameterFilters({ optional: true }) ?? [];

  /**
   * Sends telemetry data to the endpoint
   *
   * @param data Data to send
   * @param doFetch Fetch method, for testing purposes only
   */
  send(data: object, doFetch = fetch): void {
    // TODO: Switch to HttpClient in Angular 20
    doFetch(`${this.endpoint()}?${this.stringify(data)}`, {
      method: 'GET',
      cache: 'no-store',
      keepalive: true,
    });
  }

  /**
   * Stringifies telemetry data into a query string
   *
   * @param data Arbitrary data to serialize
   * @returns A query string parsable by `qs`
   */
  stringify(data: unknown): string {
    return stringify(data, {
      allowDots: true,
      arrayFormat: 'indices',
      skipNulls: true,
      filter: (prefix, value) => {
        for (const filter of this.filters) {
          const result = filter(prefix, value);
          if (result !== value) {
            return result;
          }
        }

        return serialize(value);
      },
    });
  }
}
