import { AnalyticsPlugin } from 'analytics';
import * as _angular_core from '@angular/core';
import { Signal } from '@angular/core';

/** Plugin configuration */
interface HraAnalyticsPluginConfig {
    /** Session identifier */
    sessionId: string;
}
/**
 * An `analytics` plugin that logs events to a hra endpoint
 *
 * @param config Plugin configuration
 * @returns An analytics plugin
 */
declare function hraAnalyticsPlugin(config: HraAnalyticsPluginConfig): AnalyticsPlugin;

/**
 * Telemetry service responsible for sending analytics data to the HRA analytics endpoint
 */
declare class TelemetryService {
    /** Endpoint url */
    private readonly endpoint;
    /** Parameter filters */
    private readonly filters;
    /**
     * Sends telemetry data to the endpoint
     *
     * @param data Data to send
     * @param doFetch Fetch method, for testing purposes only
     */
    send(data: object, doFetch?: typeof fetch): void;
    /**
     * Stringifies telemetry data into a query string
     *
     * @param data Arbitrary data to serialize
     * @returns A query string parsable by `qs`
     */
    stringify(data: unknown): string;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<TelemetryService, never>;
    static ɵprov: _angular_core.ɵɵInjectableDeclaration<TelemetryService>;
}

/**
 * A telemetry parameter filter function.
 * Can be used to both filter out items and customize serialization.
 */
type TelemetryParameterFilter = (prefix: string, value: unknown) => unknown;
/** Inject the telemetry endpoint */
declare const injectTelemetryEndpoint: {
    (): Signal<string>;
    (injectOptions: _angular_core.InjectOptions & {
        optional?: false;
    } & {
        injector?: _angular_core.Injector;
    }): Signal<string>;
    (injectOptions: _angular_core.InjectOptions & {
        injector?: _angular_core.Injector;
    }): Signal<string> | null;
};
/** Provide a different telemetry endpoint */
declare const provideTelemetryEndpoint: (() => _angular_core.Provider) & ((value: Signal<string> | (() => Signal<string>), isFunctionValue: boolean) => _angular_core.Provider);
/** Inject the telemetry parameter filter functions */
declare const injectTelemetryParameterFilters: {
    (): TelemetryParameterFilter[];
    (injectOptions: _angular_core.InjectOptions & {
        optional?: false;
    } & {
        injector?: _angular_core.Injector;
    }): TelemetryParameterFilter[];
    (injectOptions: _angular_core.InjectOptions & {
        injector?: _angular_core.Injector;
    }): TelemetryParameterFilter[] | null;
};
/** Provide a telemetry parameter filter function */
declare const provideTelemetryParameterFilter: ((value: TelemetryParameterFilter | (() => TelemetryParameterFilter)) => _angular_core.Provider) & ((value: TelemetryParameterFilter | (() => TelemetryParameterFilter), isFunctionValue: boolean) => _angular_core.Provider);

export { TelemetryService, hraAnalyticsPlugin, injectTelemetryEndpoint, injectTelemetryParameterFilters, provideTelemetryEndpoint, provideTelemetryParameterFilter };
export type { HraAnalyticsPluginConfig, TelemetryParameterFilter };
