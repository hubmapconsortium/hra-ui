import { APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { NgxsModule, Store } from '@ngxs/store';
import { AngularRenderer, applicationConfig } from '@storybook/angular';
import type { DecoratorFunction } from '@storybook/csf';

export interface StateConfig {
  states?: Parameters<(typeof NgxsModule)['forRoot']>[0];
  actions?: unknown[];
}

export function addState(): DecoratorFunction<AngularRenderer> {
  return (fn, ctx) => {
    const config: StateConfig | undefined = ctx.parameters['state'];
    if (!config) {
      return fn(ctx);
    }

    return applicationConfig({
      providers: [
        importProvidersFrom(NgxsModule.forFeature(config.states)),
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
