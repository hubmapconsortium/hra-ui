import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideStyleComponents } from '@hra-ui/cdk/styling';
import { TextHyperlinkGlobalStylesComponent } from './global-styles.component';

/**
 * Provides the global styles for text hyperlink elements.
 *
 * @returns Text hyperlink providers
 */
export function provideTextHyperlink(): EnvironmentProviders {
  return makeEnvironmentProviders([provideStyleComponents(TextHyperlinkGlobalStylesComponent)]);
}
