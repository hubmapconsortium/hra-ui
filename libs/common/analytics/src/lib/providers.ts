import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

export function provideAnalytics(): EnvironmentProviders {
  return makeEnvironmentProviders([]);
}
