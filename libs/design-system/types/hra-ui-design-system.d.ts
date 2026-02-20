import { HttpFeature, HttpFeatureKind } from '@angular/common/http';
import { EnvironmentProviders } from '@angular/core';
import { ScrollingOptions } from '@hra-ui/design-system/scrolling';

/** Design system provider options */
interface DesignSystemOptions {
    /** Http features */
    http?: HttpFeature<HttpFeatureKind>[];
    /** Scrolling options */
    scrolling?: ScrollingOptions;
}
/** Get the providers shared between prod and testing */
declare function provideDesignSystemCommon(options?: DesignSystemOptions): EnvironmentProviders[];
/**
 * Returns design system providers
 */
declare function provideDesignSystem(options?: DesignSystemOptions): EnvironmentProviders;

export { provideDesignSystem, provideDesignSystemCommon };
export type { DesignSystemOptions };
