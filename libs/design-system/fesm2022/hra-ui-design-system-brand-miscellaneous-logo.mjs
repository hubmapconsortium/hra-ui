import { provideEnvironmentInitializer, inject } from '@angular/core';
import { IconConfigRegistryService } from '@hra-ui/design-system/icons';

/** Icon configuration for miscellaneous logos */
const MISCELLANEOUS_ICON_CONFIG = {
    color: '#ffffff',
    backgroundColor: '#4b4b5e',
};
/**
 * Creates a new configuration resolver
 *
 * @returns A configuration resolver
 */
function createMiscellaneousLogoConfigResolver() {
    return (_name, namespace) => (namespace === 'misc' ? MISCELLANEOUS_ICON_CONFIG : undefined);
}
/**
 * Initializes miscellaneous logo icons
 */
function provideMiscellaneousLogos() {
    return provideEnvironmentInitializer(() => {
        const registry = inject(IconConfigRegistryService);
        registry.addIconConfigResolver(createMiscellaneousLogoConfigResolver());
    });
}

/**
 * Generated bundle index. Do not edit.
 */

export { provideMiscellaneousLogos };
//# sourceMappingURL=hra-ui-design-system-brand-miscellaneous-logo.mjs.map
