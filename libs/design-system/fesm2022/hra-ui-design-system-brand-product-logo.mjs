import { provideEnvironmentInitializer, inject } from '@angular/core';
import { IconConfigRegistryService } from '@hra-ui/design-system/icons';

/** Icon configuration for product logos */
const PRODUCT_ICON_CONFIG = {
    color: '#ffffff',
    backgroundColor: '#201e3d',
};
/**
 * Creates a new configuration resolver
 *
 * @returns A configuration resolver
 */
function createProductLogoConfigResolver() {
    return (_name, namespace) => (namespace === 'product' ? PRODUCT_ICON_CONFIG : undefined);
}
/**
 * Initializes product logo icons
 */
function provideProductLogos() {
    return provideEnvironmentInitializer(() => {
        const registry = inject(IconConfigRegistryService);
        registry.addIconConfigResolver(createProductLogoConfigResolver());
    });
}

/**
 * Generated bundle index. Do not edit.
 */

export { provideProductLogos };
//# sourceMappingURL=hra-ui-design-system-brand-product-logo.mjs.map
