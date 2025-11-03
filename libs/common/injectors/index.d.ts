import * as _angular_core from '@angular/core';

/** Brand logo */
interface BrandLogo {
    /** Logo size */
    size: 'regular' | 'small';
    /** Logo source url */
    src: string;
    /** Logo width */
    width: number;
    /** Logo height */
    height: number;
}
/** Application configuration */
interface AppConfiguration {
    /** Application name */
    name?: string;
    /** Application version */
    version?: string;
    /** Application url */
    url?: string;
    /** Brand logos */
    logos?: BrandLogo[];
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

/**
 * Inject the global window
 *
 * @returns The window object
 */
declare function injectWindow(): typeof window;

export { injectAppConfiguration, injectDocument, injectWindow, provideAppConfiguration };
export type { AppConfiguration, BrandLogo };
