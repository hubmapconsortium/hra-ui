import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { INITIAL_APP_HREF } from './app-href.service';

/**
 * Provides an initial appHref value for the entire application
 *
 * @param href Initial appHref value
 */
export function provideAppHref(href: string): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: INITIAL_APP_HREF,
      useValue: href,
    },
  ]);
}
