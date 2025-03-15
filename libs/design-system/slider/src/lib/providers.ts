import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideStyleComponents } from '@hra-ui/cdk/styling';
import { SliderGlobalStylesComponent } from './global-styles.component';

/**
 * Applies global styles to sliders
 *
 * @returns Slider providers
 */
export function provideSlider(): EnvironmentProviders {
  return makeEnvironmentProviders([provideStyleComponents(SliderGlobalStylesComponent)]);
}
