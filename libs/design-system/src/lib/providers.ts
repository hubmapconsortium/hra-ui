import { provideHttpClient } from '@angular/common/http';
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideIcons } from '@hra-ui/cdk/icons';
import { provideButtons } from '@hra-ui/design-system/button';
import { provideIconButtons } from '@hra-ui/design-system/icon-button';
import { provideMenu } from '@hra-ui/design-system/menu';
import { provideScrolling } from '@hra-ui/design-system/scrolling';
import { provideTable } from '@hra-ui/design-system/table';

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
    provideButtons(),
    provideIconButtons(),
    provideScrolling(),
    provideMenu(),
    provideTable(),
  ]);
}
