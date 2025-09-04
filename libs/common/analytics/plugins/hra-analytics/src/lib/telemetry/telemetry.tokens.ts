import { isDevMode, Signal, signal } from '@angular/core';
import { createInjectionToken, createNoopInjectionToken } from 'ngxtension/create-injection-token';

/**
 * A telemetry parameter filter function.
 * Can be used to both filter out items and customize serialization.
 */
export type TelemetryParameterFilter = (prefix: string, value: unknown) => unknown;

/** Telemetry endpoint */
const TELEMETRY_ENDPOINT = createInjectionToken((): Signal<string> => {
  const url = `https://cdn.humanatlas.io/tr${isDevMode() ? '-dev' : ''}`;
  return signal(url);
});

/** Telemetry parameter filters */
const TELEMETRY_PARAMETER_FILTERS = createNoopInjectionToken<TelemetryParameterFilter, true>('Parameter filter', {
  multi: true,
  isFunctionValue: true,
});

/** Inject the telemetry endpoint */
export const injectTelemetryEndpoint = TELEMETRY_ENDPOINT[0];
/** Provide a different telemetry endpoint */
export const provideTelemetryEndpoint = TELEMETRY_ENDPOINT[1];

/** Inject the telemetry parameter filter functions */
export const injectTelemetryParameterFilters = TELEMETRY_PARAMETER_FILTERS[0];
/** Provide a telemetry parameter filter function */
export const provideTelemetryParameterFilter = TELEMETRY_PARAMETER_FILTERS[1];
