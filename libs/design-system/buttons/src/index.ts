import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideTextHyperlink } from '@hra-ui/design-system/buttons/text-hyperlink';

export function provideButtons(): EnvironmentProviders {
  return makeEnvironmentProviders([provideTextHyperlink()]);
}
