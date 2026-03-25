import * as i0 from '@angular/core';
import { SimpleChanges, OnInit, OnChanges, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { GlobalConfigState } from 'ccf-shared';

/** Global config */
type GenericGlobalConfig = Record<string, unknown>;
/** Manager options */
interface ConfigManagerOptions {
    /** Initial config */
    initialConfig?: GenericGlobalConfig;
    /** Input parsers */
    parse?: Record<string, (value: unknown) => unknown>;
    /** Input aliasing */
    rename?: Record<string, string>;
}
/** Config manager */
declare class ConfigManager {
    readonly configState: GlobalConfigState<GenericGlobalConfig>;
    /** Options */
    readonly options: Required<ConfigManagerOptions>;
    /** Changes to be applied */
    private storedChanges;
    /** Initialize the manager */
    constructor(configState: GlobalConfigState<GenericGlobalConfig>, options: ConfigManagerOptions);
    /**
     * Add changes to be applied
     *
     * @param changes Changes
     */
    addChanges(changes: SimpleChanges): void;
    /**
     * Applies changes
     *
     * @param changes Changes to apply
     * @param additionalConfig Additional configuration
     */
    applyChanges(changes?: SimpleChanges, additionalConfig?: GenericGlobalConfig): void;
    /**
     * Process a single change
     *
     * @param key Change key
     * @param change Change
     * @param output Output object
     */
    private processChange;
}

/** Web component options */
interface BaseWebComponentOptions extends ConfigManagerOptions {
    /** Initial delay to allow the component to settle */
    initialDelay?: number;
}
/** Base web component */
declare class BaseWebComponent implements OnInit, OnChanges, OnDestroy {
    /** Global config */
    readonly configState: GlobalConfigState<GenericGlobalConfig>;
    /** Change detector */
    readonly cdr: ChangeDetectorRef;
    /** Whether the component is fully initialized */
    initialized: boolean;
    /** Config manager */
    configManager: ConfigManager;
    /** Component options */
    readonly options: BaseWebComponentOptions;
    /** Init timeout reference */
    private _init?;
    /** Initialize the component */
    constructor(options?: BaseWebComponentOptions);
    /** Initialize the component */
    ngOnInit(): void;
    /** Cleans up the component */
    ngOnDestroy(): void;
    /** React to input changes */
    ngOnChanges(changes: SimpleChanges): void;
    /** Initialize the component */
    initialize(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BaseWebComponent, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BaseWebComponent, never, never, {}, {}, never, never, true, never>;
}

/** Builtin input parsing function */
declare const BUILTIN_PARSERS: {
    boolean: (value: unknown) => boolean;
    json: (value: unknown) => unknown;
    stringArray: (value: unknown) => unknown;
    function: (value: unknown) => Function;
};

export { BUILTIN_PARSERS, BaseWebComponent, ConfigManager };
export type { BaseWebComponentOptions, ConfigManagerOptions, GenericGlobalConfig };
