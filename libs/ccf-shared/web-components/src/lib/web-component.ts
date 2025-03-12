import { ChangeDetectorRef, Directive, OnChanges, OnDestroy, OnInit, SimpleChanges, inject } from '@angular/core';
import { GlobalConfigState } from 'ccf-shared';
import { ConfigManager, ConfigManagerOptions, GenericGlobalConfig } from './config-manager';

/** Web component options */
export interface BaseWebComponentOptions extends ConfigManagerOptions {
  /** Initial delay to allow the component to settle */
  initialDelay?: number;
}

/** Base web component */
@Directive()
export class BaseWebComponent implements OnInit, OnChanges, OnDestroy {
  /** Global config */
  readonly configState = inject<GlobalConfigState<GenericGlobalConfig>>(GlobalConfigState);
  /** Change detector */
  readonly cdr = inject(ChangeDetectorRef);

  /** Whether the component is fully initialized */
  initialized = false;
  /** Config manager */
  configManager: ConfigManager;

  /** Init timeout reference */
  private _init?: ReturnType<typeof setTimeout>;

  /** Initialize the component */
  constructor(readonly options: BaseWebComponentOptions = {}) {
    this.configManager = new ConfigManager(this.configState, this.options);
  }

  /** Initialize the component */
  ngOnInit(): void {
    this._init = setTimeout(() => this.initialize(), this.options.initialDelay ?? 0);
  }

  /** Cleans up the component */
  ngOnDestroy(): void {
    if (this._init) {
      clearTimeout(this._init);
    }
  }

  /** React to input changes */
  ngOnChanges(changes: SimpleChanges): void {
    this.configManager.addChanges(changes);
    if (this.initialized) {
      this.configManager.applyChanges();
    }
  }

  /** Initialize the component */
  initialize(): void {
    this._init = undefined;
    if (this.initialized) {
      return;
    }

    this.configManager.applyChanges();
    this.initialized = true;
    this.cdr.markForCheck();
  }
}
