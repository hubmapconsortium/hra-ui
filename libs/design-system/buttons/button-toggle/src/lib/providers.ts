import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS, MatButtonToggleDefaultOptions } from '@angular/material/button-toggle';

/**
 * Applies global styles to button toggles
 *
 * @returns Button toggle providers
 */
export function provideButtonToggle(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS,
      useValue: {
        hideMultipleSelectionIndicator: true,
        hideSingleSelectionIndicator: true,
      } satisfies MatButtonToggleDefaultOptions,
    },
  ]);
}
