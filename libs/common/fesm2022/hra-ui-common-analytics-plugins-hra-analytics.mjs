import * as i0 from '@angular/core';
import { isDevMode, signal, Injectable, assertInInjectionContext, inject } from '@angular/core';
import { CoreEvents } from '@hra-ui/common/analytics/events';
import { stringify } from 'qs';
import { HttpErrorResponse } from '@angular/common/http';
import { createInjectionToken, createNoopInjectionToken } from 'ngxtension/create-injection-token';

/**
 * Safely truncates a query string to a maximum length by truncating individual values.
 * The input query string is assumed to be URL-encoded.
 *
 * @param queryString The original query string
 * @param maxLength Maximum length of the query string
 * @param options Additional options for truncation
 * @returns A safely truncated query string
 * @throws Error if the query string cannot be truncated to the desired length
 */
function safeTruncateQueryString(queryString, maxLength, options = {}) {
    if (queryString.length <= maxLength) {
        return queryString;
    }
    const { truncatedSuffix = encodeURIComponent('... [truncated]'), minValueLength = 100 } = options;
    const pairs = queryString.split('&');
    const pairsByLength = [...pairs].sort((a, b) => b.length - a.length);
    let length = queryString.length;
    while (length > maxLength) {
        const current = pairsByLength.shift();
        if (!current) {
            throw new Error(`Unable to truncate query string to length ${maxLength}`);
        }
        const [key, value] = current.split('=');
        if (value.length <= minValueLength + truncatedSuffix.length) {
            throw new Error(`Unable to truncate any more values to minimum length ${minValueLength}`);
        }
        const newLength = Math.max(minValueLength, value.length - truncatedSuffix.length - (length - maxLength));
        const newValue = value.slice(0, newLength) + truncatedSuffix;
        const newPair = `${key}=${newValue}`;
        const index = pairs.indexOf(current);
        pairs[index] = newPair;
        length -= current.length - newPair.length;
    }
    return pairs.join('&');
}

/**
 * Serializes complex values into simpler types.
 * Currently handles the following objects:
 * - Errors (and subclasses)
 * - Events (ErrorEvent, KeyboardEvent, and MouseEvent)
 * - Maps
 * - Sets
 * - Angular's HTTP error responses
 *
 * @param value Value to serialize
 * @returns A replacement value to serialize
 */
function serialize(value) {
    // Short circuit for non-objects
    if (typeof value !== 'object' || value === null) {
        return value;
    }
    if (value instanceof Date) {
        return value.toISOString();
    }
    else if (value instanceof Error) {
        return pick(value, ['name', 'message', 'stack']);
    }
    else if (value instanceof HttpErrorResponse) {
        return pick(value, ['status', 'url', 'message', 'error']);
    }
    else if (value instanceof Event) {
        if (value instanceof ErrorEvent) {
            return pick(value, ['message', 'filename', 'lineno', 'colno']);
        }
        else if (value instanceof KeyboardEvent) {
            const keys = ['key', 'altKey', 'ctrlKey', 'metaKey', 'shiftKey', 'repeat'];
            return filterFalse(pick(value, keys));
        }
        else if (value instanceof MouseEvent) {
            const keys = ['button', 'buttons', 'altKey', 'ctrlKey', 'metaKey', 'shiftKey'];
            const props = pick(value, keys);
            const { type, currentTarget: el } = value;
            const isAnchorClick = type === 'click' && el instanceof HTMLAnchorElement;
            const targetKeys = ['href', 'type', 'target', 'download'];
            const targetProps = isAnchorClick ? pickAttributes(el, targetKeys) : {};
            return filterFalse({ ...props, ...targetProps });
        }
        return pick(value, ['type']);
    }
    else if (value instanceof Map) {
        return { map: [...value] };
    }
    else if (value instanceof Set) {
        return { set: [...value] };
    }
    return value;
}
/**
 * Pick a set of properties from an object
 *
 * @param obj Original object
 * @param keys Keys to pick from the object
 * @returns A subset of the object
 */
function pick(obj, keys) {
    return keys.reduce((acc, key) => {
        acc[key] = obj[key];
        return acc;
    }, {});
}
/**
 * Pick a set of attributes from an element.
 * Excludes attributes not present on the element.
 *
 * @param el Element reference
 * @param attributes Attributes to pick
 * @returns Values by attribute name
 */
function pickAttributes(el, attributes) {
    return attributes.reduce((acc, attr) => {
        const value = el.getAttribute(attr);
        if (value !== null) {
            acc[attr] = value;
        }
        return acc;
    }, {});
}
/**
 * Creates a new object where any keys with a value strictly equal to false are removed
 *
 * @param obj Original object
 * @returns Filtered object
 */
function filterFalse(obj) {
    const result = {};
    for (const key in obj) {
        if (obj[key] !== false) {
            result[key] = obj[key];
        }
    }
    return result;
}

/** Telemetry endpoint */
const TELEMETRY_ENDPOINT = createInjectionToken(() => {
    const url = `https://cdn.humanatlas.io/tr${isDevMode() ? '-dev' : ''}`;
    return signal(url);
});
/** Telemetry parameter filters */
const TELEMETRY_PARAMETER_FILTERS = createNoopInjectionToken('Parameter filter', {
    multi: true,
    isFunctionValue: true,
});
/** Inject the telemetry endpoint */
const injectTelemetryEndpoint = TELEMETRY_ENDPOINT[0];
/** Provide a different telemetry endpoint */
const provideTelemetryEndpoint = TELEMETRY_ENDPOINT[1];
/** Inject the telemetry parameter filter functions */
const injectTelemetryParameterFilters = TELEMETRY_PARAMETER_FILTERS[0];
/** Provide a telemetry parameter filter function */
const provideTelemetryParameterFilter = TELEMETRY_PARAMETER_FILTERS[1];

/**
 * Telemetry service responsible for sending analytics data to the HRA analytics endpoint
 */
class TelemetryService {
    /** Default maximum query string length */
    static DEFAULT_MAX_QUERY_STRING_LENGTH = 7000;
    /** Endpoint url */
    endpoint = injectTelemetryEndpoint();
    /** Parameter filters */
    filters = injectTelemetryParameterFilters({ optional: true }) ?? [];
    /**
     * Sends telemetry data to the endpoint
     *
     * @param data Data to send
     * @param doFetch Fetch method, for testing purposes only
     */
    send(data, doFetch = fetch) {
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
     * @param maxLength Maximum length of the query string
     * @param options Safe truncation options
     * @returns A query string parsable by `qs`
     */
    stringify(data, maxLength = TelemetryService.DEFAULT_MAX_QUERY_STRING_LENGTH, options) {
        const queryString = stringify(data, {
            allowDots: true,
            arrayFormat: 'indices',
            skipNulls: true,
            filter: (prefix, value) => {
                for (const filter of this.filters) {
                    const result = filter(prefix, value);
                    if (result !== value) {
                        return serialize(result);
                    }
                }
                return serialize(value);
            },
        });
        return safeTruncateQueryString(queryString, maxLength, options);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: TelemetryService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: TelemetryService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: TelemetryService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

/**
 * An `analytics` plugin that logs events to a hra endpoint
 *
 * @param config Plugin configuration
 * @returns An analytics plugin
 */
function hraAnalyticsPlugin(config) {
    assertInInjectionContext(hraAnalyticsPlugin);
    const telemetry = inject(TelemetryService);
    return {
        name: 'hra-analytics',
        config: config,
        page({ config: config_, instance, payload }) {
            telemetry.send(buildEventData(instance, config_, CoreEvents.PageView.type, payload.properties));
        },
        track({ config: config_, instance, payload: { event, properties } }) {
            telemetry.send(buildEventData(instance, config_, event, properties));
        },
    };
}
/**
 * Builds the data to send to analytics.
 * Adds common fields like app, version, etc. and normalizes event payloads.
 *
 * @param instance Analytics instance
 * @param config Plugin config
 * @param event Event name
 * @param props Event properties
 * @returns Data to send to analytics
 */
function buildEventData(instance, config, event, props) {
    const { trigger, triggerData } = props;
    let path = undefined;
    if (event !== CoreEvents.PageView.type) {
        path = props.path;
        props = { ...props };
        delete props.path;
        delete props.trigger;
        delete props.triggerData;
    }
    return {
        sv: 0,
        sessionId: config.sessionId,
        app: instance.getState('context.app'),
        version: instance.getState('context.version'),
        event,
        path,
        trigger,
        triggerData,
        e: props,
    };
}

/**
 * Generated bundle index. Do not edit.
 */

export { TelemetryService, hraAnalyticsPlugin, injectTelemetryEndpoint, injectTelemetryParameterFilters, provideTelemetryEndpoint, provideTelemetryParameterFilter };
//# sourceMappingURL=hra-ui-common-analytics-plugins-hra-analytics.mjs.map
