import { makeEnvironmentProviders } from '@angular/core';
import { MAT_TABS_CONFIG } from '@angular/material/tabs';

/**
 * Applies global configuration for material UI tabs.
 * @returns Providers with global configuration.
 */
function provideTabs() {
    return makeEnvironmentProviders([
        {
            provide: MAT_TABS_CONFIG,
            useValue: {
                stretchTabs: false,
            },
        },
    ]);
}

/**
 * Generated bundle index. Do not edit.
 */

export { provideTabs };
//# sourceMappingURL=hra-ui-design-system-tabs.mjs.map
