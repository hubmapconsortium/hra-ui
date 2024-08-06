import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideIcons } from '@hra-ui/cdk/icons';
import { provideStyleComponents } from '@hra-ui/cdk/styling';
import { MatIconButtonStylesComponent } from './mat-icon-button-styles/mat-icon-button-styles.component';

export function provideDesignSystem(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideIcons({
      fontIcons: {
        defaultClasses: ['material-symbols-rounded'],
      },
    }),
    provideStyleComponents(MatIconButtonStylesComponent),
  ]);
}
