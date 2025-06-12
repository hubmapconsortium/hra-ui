import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideButtonToggle } from '@hra-ui/design-system/buttons/button-toggle';
import { provideRadioButton } from '@hra-ui/design-system/buttons/radio-button';
import { provideTextHyperlink } from '@hra-ui/design-system/buttons/text-hyperlink';

/**
 * Collects all subpackage providers into a single provider function.
 *
 * @returns Button providers
 */
export function provideButtons(): EnvironmentProviders {
  return makeEnvironmentProviders([provideButtonToggle(), provideRadioButton(), provideTextHyperlink()]);
}
