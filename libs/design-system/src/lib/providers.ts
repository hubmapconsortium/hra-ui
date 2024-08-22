import { provideHttpClient } from '@angular/common/http';
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideIcons } from '@hra-ui/cdk/icons';
import { provideIconButtons } from '@hra-ui/design-system/icon-button';
import { provideTrees } from '@hra-ui/design-system/tree';

/**
 * Returns design system providers
 */
export function provideDesignSystem(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideHttpClient(),
    provideIcons({
      fontIcons: {
        defaultClasses: ['material-symbols-rounded'],
      },
    }),
    provideIconButtons(),
    provideTrees(),
  ]);
}
