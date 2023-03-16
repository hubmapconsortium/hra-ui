import { APP_INITIALIZER } from '@angular/core';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule, Store } from '@ngxs/store';
import { AngularFramework, moduleMetadata } from '@storybook/angular';
import type { DecoratorFunction } from '@storybook/csf';

export interface StateConfig {
  states?: Parameters<(typeof NgxsModule)['forRoot']>[0];
  actions?: unknown[];
}

export function addState<TArgs = unknown>(): DecoratorFunction<AngularFramework, TArgs> {
  return (fn, ctx) => {
    const config: StateConfig | undefined = ctx.parameters['state'];
    if (!config) {
      return fn();
    }

    return moduleMetadata({
      imports: [NgxsModule.forRoot(config.states, {}), NgxsLoggerPluginModule.forRoot()],
      providers: [
        {
          provide: APP_INITIALIZER,
          multi: true,
          useFactory: (store: Store) => () => {
            const { actions } = config;
            const hasActions = actions && actions.length > 0;
            return hasActions ? store.dispatch(actions) : undefined;
          },
          deps: [Store],
        },
      ],
    })(fn, ctx);
  };
}
