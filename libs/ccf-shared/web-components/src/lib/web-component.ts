import { ChangeDetectorRef, Directive, OnChanges, OnDestroy, OnInit, SimpleChanges, inject } from '@angular/core';
import { GlobalConfigState } from 'ccf-shared';

import { ConfigManager, ConfigManagerOptions, GenericGlobalConfig } from './config-manager';

export interface BaseWebComponentOptions extends ConfigManagerOptions {
  initialDelay?: number;
}

@Directive()
export class BaseWebComponent implements OnInit, OnChanges, OnDestroy {
  readonly configState = inject<GlobalConfigState<GenericGlobalConfig>>(GlobalConfigState);
  readonly cdr = inject(ChangeDetectorRef);

  initialized = false;
  configManager: ConfigManager;

  private _init?: ReturnType<typeof setTimeout>;

  constructor(readonly options: BaseWebComponentOptions = {}) {
    this.configManager = new ConfigManager(this.configState, this.options);
  }

  ngOnInit(): void {
    this._init = setTimeout(() => this.initialize(), this.options.initialDelay ?? 0);
  }

  ngOnDestroy(): void {
    if (this._init) {
      clearTimeout(this._init);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.configManager.addChanges(changes);
    if (this.initialized) {
      this.configManager.applyChanges();
    }
  }

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
