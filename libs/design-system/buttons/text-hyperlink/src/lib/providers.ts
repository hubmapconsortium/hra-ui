import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideStyleComponents } from '@hra-ui/cdk/styling';
import { TextHyperlinkGlobalStylesComponent } from './global-styles.component';

export function provideTextHyperlink(): EnvironmentProviders {
  return makeEnvironmentProviders([provideStyleComponents(TextHyperlinkGlobalStylesComponent)]);
}
