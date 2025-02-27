import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideButton } from '@hra-ui/design-system/buttons/button';
import { provideButtonToggle } from '@hra-ui/design-system/buttons/button-toggle';
import { provideTextHyperlink } from '@hra-ui/design-system/buttons/text-hyperlink';

/**
 * Collects all subpackage providers into a single provider function.
 *
 * @returns Button providers
 */
export function provideButtons(): EnvironmentProviders {
  return makeEnvironmentProviders([provideButton(), provideButtonToggle(), provideTextHyperlink()]);
}
