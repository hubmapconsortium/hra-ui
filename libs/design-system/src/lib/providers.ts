import { provideHttpClient } from '@angular/common/http';
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideIcons } from '@hra-ui/cdk/icons';
import { provideButtons } from '@hra-ui/design-system/button';
import { provideIconButtons } from '@hra-ui/design-system/icon-button';
import { provideMenu } from '@hra-ui/design-system/menu';
import { provideTrees } from '@hra-ui/design-system/tree';
import { provideScrolling } from '@hra-ui/design-system/scrolling';
import { provideTable } from '@hra-ui/design-system/table';
import { provideSelect } from '@hra-ui/design-system/select';
import { provideInput } from '@hra-ui/design-system/input';
import { provideButtonToggle } from '@hra-ui/design-system/button-toggle';

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
    provideTrees(),
    provideScrolling(),
    provideMenu(),
    provideTable(),
    provideSelect(),
    provideInput(),
    provideButtonToggle(),
  ]);
}
