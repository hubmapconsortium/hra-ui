import * as i0 from '@angular/core';
import { inject, ChangeDetectorRef, Directive } from '@angular/core';
import { GlobalConfigState } from 'ccf-shared';

/** Default options */
const DEFAULT_OPTIONS = {
    initialConfig: {},
    parse: {},
    rename: {},
};
/** Config manager */
class ConfigManager {
    configState;
    /** Options */
    options;
    /** Changes to be applied */
    storedChanges = {};
    /** Initialize the manager */
    constructor(configState, options) {
        this.configState = configState;
        this.options = { ...DEFAULT_OPTIONS, ...options };
    }
    /**
     * Add changes to be applied
     *
     * @param changes Changes
     */
    addChanges(changes) {
        this.storedChanges = { ...this.storedChanges, ...changes };
    }
    /**
     * Applies changes
     *
     * @param changes Changes to apply
     * @param additionalConfig Additional configuration
     */
    applyChanges(changes, additionalConfig = {}) {
        if (changes === undefined) {
            changes = this.storedChanges;
            this.storedChanges = {};
        }
        const { configState, options: { initialConfig }, } = this;
        const previousConfig = configState.snapshot;
        const newConfig = {
            ...initialConfig,
            ...previousConfig,
            ...additionalConfig,
        };
        for (const [key, change] of Object.entries(changes)) {
            this.processChange(key, change, newConfig);
        }
        configState.setConfig(newConfig);
    }
    /**
     * Process a single change
     *
     * @param key Change key
     * @param change Change
     * @param output Output object
     */
    processChange(key, change, output) {
        const { options: { parse, rename }, } = this;
        const target = rename[key] ?? key;
        const value = change.currentValue;
        const parser = parse[key] ?? parse[target];
        if (value == null) {
            delete output[target];
        }
        else if (!parser) {
            output[target] = value;
        }
        else {
            try {
                output[target] = parser(value);
            }
            catch (error) {
                // eslint-disable-next-line no-console
                console.warn(`Failed to parse ${key} = ${value} (${typeof value})`, error.message);
            }
        }
    }
}

/** Base web component */
class BaseWebComponent {
    /** Global config */
    configState = inject(GlobalConfigState);
    /** Change detector */
    cdr = inject(ChangeDetectorRef);
    /** Whether the component is fully initialized */
    initialized = false;
    /** Config manager */
    configManager;
    /** Component options */
    options;
    /** Init timeout reference */
    _init;
    /** Initialize the component */
    constructor(options = {}) {
        this.options = options;
        this.configManager = new ConfigManager(this.configState, this.options);
    }
    /** Initialize the component */
    ngOnInit() {
        this._init = setTimeout(() => this.initialize(), this.options.initialDelay ?? 0);
    }
    /** Cleans up the component */
    ngOnDestroy() {
        if (this._init) {
            clearTimeout(this._init);
        }
    }
    /** React to input changes */
    ngOnChanges(changes) {
        this.configManager.addChanges(changes);
        if (this.initialized) {
            this.configManager.applyChanges();
        }
    }
    /** Initialize the component */
    initialize() {
        this._init = undefined;
        if (this.initialized) {
            return;
        }
        this.configManager.applyChanges();
        this.initialized = true;
        this.cdr.markForCheck();
    }
    static ɵfac = function BaseWebComponent_Factory(__ngFactoryType__) { i0.ɵɵinvalidFactory(); };
    static ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: BaseWebComponent, features: [i0.ɵɵNgOnChangesFeature] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BaseWebComponent, [{
        type: Directive
    }], () => [{ type: undefined }], null); })();

/** Builtin input parsing function */
const BUILTIN_PARSERS = {
    boolean: (value) => `${value}` !== 'false',
    json: (value) => (typeof value === 'string' ? JSON.parse(value) : value),
    stringArray: (value) => typeof value === 'string' ? Array.from(value).filter((item) => !'[], '.includes(item)) : value,
    function: (value) => {
        if (typeof value !== 'function') {
            throw new Error('Expected a javascript function');
        }
        return value;
    },
};

/**
 * Generated bundle index. Do not edit.
 */

export { BUILTIN_PARSERS, BaseWebComponent, ConfigManager };
//# sourceMappingURL=ccf-shared-web-components.mjs.map
