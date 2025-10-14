import { OverlayContainer } from '@angular/cdk/overlay';
import { provideHttpClient } from '@angular/common/http';
import { provideAppInitializer, inject, makeEnvironmentProviders } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideBrand } from '@hra-ui/design-system/brand';
import { provideButtons } from '@hra-ui/design-system/buttons';
import { provideCodeBlock } from '@hra-ui/design-system/code-block';
import { provideIcons } from '@hra-ui/design-system/icons';
import { provideScrolling } from '@hra-ui/design-system/scrolling';
import { provideTabs } from '@hra-ui/design-system/tabs';
import { provideTrees } from '@hra-ui/design-system/tree';

/** Get the providers shared between prod and testing */
function provideDesignSystemCommon(options) {
    return [
        provideAppInitializer(() => {
            const overlayContainer = inject(OverlayContainer);
            overlayContainer.getContainerElement().classList.add('hra-app');
        }),
        provideBrand(),
        provideButtons(),
        provideCodeBlock(),
        provideIcons(),
        provideScrolling(options?.scrolling),
        provideTrees(),
        provideTabs(),
    ];
}
/**
 * Returns design system providers
 */
function provideDesignSystem(options) {
    return makeEnvironmentProviders([
        provideHttpClient(...(options?.http ?? [])),
        provideAnimations(),
        ...provideDesignSystemCommon(options),
    ]);
}

/**
 * Generated bundle index. Do not edit.
 */

export { provideDesignSystem, provideDesignSystemCommon };
//# sourceMappingURL=hra-ui-design-system.mjs.map
