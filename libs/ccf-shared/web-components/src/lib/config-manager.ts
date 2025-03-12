import { SimpleChange, SimpleChanges } from '@angular/core';
import { GlobalConfigState } from 'ccf-shared';

/** Global config */
export type GenericGlobalConfig = Record<string, unknown>;

/** Manager options */
export interface ConfigManagerOptions {
  /** Initial config */
  initialConfig?: GenericGlobalConfig;

  /** Input parsers */
  parse?: Record<string, (value: unknown) => unknown>;
  /** Input aliasing */
  rename?: Record<string, string>;
}

/** Default options */
const DEFAULT_OPTIONS: Required<ConfigManagerOptions> = {
  initialConfig: {},
  parse: {},
  rename: {},
};

/** Config manager */
export class ConfigManager {
  /** Options */
  readonly options: Required<ConfigManagerOptions>;

  /** Changes to be applied */
  private storedChanges: SimpleChanges = {};

  /** Initialize the manager */
  constructor(
    readonly configState: GlobalConfigState<GenericGlobalConfig>,
    options: ConfigManagerOptions,
  ) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
  }

  /**
   * Add changes to be applied
   *
   * @param changes Changes
   */
  addChanges(changes: SimpleChanges): void {
    this.storedChanges = { ...this.storedChanges, ...changes };
  }

  /**
   * Applies changes
   *
   * @param changes Changes to apply
   * @param additionalConfig Additional configuration
   */
  applyChanges(changes?: SimpleChanges, additionalConfig: GenericGlobalConfig = {}): void {
    if (changes === undefined) {
      changes = this.storedChanges;
      this.storedChanges = {};
    }

    const {
      configState,
      options: { initialConfig },
    } = this;
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
  private processChange(key: string, change: SimpleChange, output: GenericGlobalConfig): void {
    const {
      options: { parse, rename },
    } = this;
    const target = rename[key] ?? key;
    const value = change.currentValue;
    const parser = parse[key] ?? parse[target];

    if (value == null) {
      delete output[target];
    } else if (!parser) {
      output[target] = value;
    } else {
      try {
        output[target] = parser(value);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(`Failed to parse ${key} = ${value} (${typeof value})`, (error as Error).message);
      }
    }
  }
}
