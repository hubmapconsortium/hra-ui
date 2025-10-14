import { provideEnvironmentInitializer, inject } from '@angular/core';
import { IconConfigRegistryService } from '@hra-ui/design-system/icons';

/** Icon configuration for organ logos */
const ORGAN_ICON_CONFIG = {
    color: '#ffffff',
    backgroundColor: '#ff0043',
};
/**
 * Creates a new configuration resolver
 *
 * @returns A configuration resolver
 */
function createOrganLogoConfigResolver() {
    return (_name, namespace) => (namespace === 'organ' ? ORGAN_ICON_CONFIG : undefined);
}
/**
 * Initializes organ logo icons
 */
function provideOrganLogos() {
    return provideEnvironmentInitializer(() => {
        const registry = inject(IconConfigRegistryService);
        registry.addIconConfigResolver(createOrganLogoConfigResolver());
    });
}

/**
 * Generated bundle index. Do not edit.
 */

export { provideOrganLogos };
//# sourceMappingURL=hra-ui-design-system-brand-organ-logo.mjs.map
