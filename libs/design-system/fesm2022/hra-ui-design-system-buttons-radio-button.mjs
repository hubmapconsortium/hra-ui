import { makeEnvironmentProviders } from '@angular/core';
import { provideStyleComponents } from '@hra-ui/cdk/styling';

/**
 * Applies global styles to radio button
 *
 * @returns Radio Button providers
 */
function provideRadioButton() {
    return makeEnvironmentProviders([provideStyleComponents()]);
}

/**
 * Generated bundle index. Do not edit.
 */

export { provideRadioButton };
//# sourceMappingURL=hra-ui-design-system-buttons-radio-button.mjs.map
