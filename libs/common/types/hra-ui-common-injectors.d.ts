import * as _angular_core from '@angular/core';

/** Application configuration */
interface AppConfiguration {
    /** Application name */
    name?: string;
    /** Application version */
    version?: string;
    /** Application url */
    url?: string;
}
/** Inject the global application configuration */
declare const injectAppConfiguration: {
    (): AppConfiguration;
    (injectOptions: _angular_core.InjectOptions & {
        optional?: false;
    } & {
        injector?: _angular_core.Injector;
    }): AppConfiguration;
    (injectOptions: _angular_core.InjectOptions & {
        injector?: _angular_core.Injector;
    }): AppConfiguration | null;
};
/** Set the application configuration */
declare const provideAppConfiguration: (() => _angular_core.Provider) & ((value: AppConfiguration | (() => AppConfiguration)) => _angular_core.Provider);

/**
 * Inject the global document, i.e. the main rendering context
 *
 * @returns The document object
 */
declare function injectDocument(): Document;

/** Inject the window object */
declare const injectWindow: {
    (): Window & typeof globalThis;
    (injectOptions: _angular_core.InjectOptions & {
        optional?: false;
    } & {
        injector?: _angular_core.Injector;
    }): Window & typeof globalThis;
    (injectOptions: _angular_core.InjectOptions & {
        injector?: _angular_core.Injector;
    }): (Window & typeof globalThis) | null;
};
/** Provide a new window object. Only intended for testing purposes. */
declare const provideWindow: (() => _angular_core.Provider) & ((value: (Window & typeof globalThis) | (() => Window & typeof globalThis)) => _angular_core.Provider);

export { injectAppConfiguration, injectDocument, injectWindow, provideAppConfiguration, provideWindow };
export type { AppConfiguration };
