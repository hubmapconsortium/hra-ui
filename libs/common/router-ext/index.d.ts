import * as _angular_core from '@angular/core';
import { EnvironmentProviders } from '@angular/core';
import { Router } from '@angular/router';
import { ProviderFeature } from '@hra-ui/common/util/providers';

/**
 * Simpler version of `RouterLink` that only navigates to a different fragments.
 * Must be used on `<a>` or `<area>` elements.
 */
declare class FragmentLinkDirective {
    /** Url fragment (with or without a leading #) */
    readonly fragment: _angular_core.InputSignalWithTransform<string, string>;
    /** Reference to the router */
    private readonly router;
    /**
     * Perform a navigation in response to a click event
     *
     * @param event Click event
     * @returns true if the default handler should run, false otherwise
     */
    onClick(event: MouseEvent): boolean;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<FragmentLinkDirective, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<FragmentLinkDirective, "a[hraFragmentLink], area[hraFragmentLink]", never, { "fragment": { "alias": "hraFragmentLink"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}

/**
 * Inject the router.
 * Use instead of `inject(Router, { optional: true })` for better tree shaking.
 */
declare const injectRouter: {
    (): Router;
    (injectOptions: _angular_core.InjectOptions & {
        optional?: false;
    } & {
        injector?: _angular_core.Injector;
    }): Router;
    (injectOptions: _angular_core.InjectOptions & {
        injector?: _angular_core.Injector;
    }): Router | null;
};

/**
 * Simpler version of `RouterLink`.
 * Only supports absolute urls and must be used on `<a>` or `<area>` elements.
 */
declare class LinkDirective {
    /** Full url */
    readonly url: _angular_core.InputSignal<string>;
    /** Whether the link should open is a new tab/window */
    readonly external: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** Reference to the router (if available) */
    private readonly router;
    /** Url resolving function */
    private readonly resolve;
    /** Resolved url tree */
    private readonly urlTree;
    /**
     * Perform a navigation in response to a click event
     *
     * @param event Click event
     * @returns true if the default handler should run, false otherwise
     */
    onClick(event: MouseEvent): boolean;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<LinkDirective, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<LinkDirective, "a[hraLink], area[hraLink]", never, { "url": { "alias": "hraLink"; "required": true; "isSignal": true; }; "external": { "alias": "hraLinkExternal"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

/** Router extension feature */
type RouterExtFeature = ProviderFeature<RouterExtFeatureKind>;
/** Router extension feature kind */
declare const enum RouterExtFeatureKind {
}
/**
 * Provide additional router features.
 * Must be used along side of `provideRouter`.
 *
 * @param features Router extension features
 * @returns Environment providers
 */
declare function provideRouterExt(...features: RouterExtFeature[]): EnvironmentProviders;

declare class RouterExtModule {
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RouterExtModule, never>;
    static ɵmod: _angular_core.ɵɵNgModuleDeclaration<RouterExtModule, never, [typeof LinkDirective, typeof FragmentLinkDirective], [typeof LinkDirective, typeof FragmentLinkDirective]>;
    static ɵinj: _angular_core.ɵɵInjectorDeclaration<RouterExtModule>;
}

export { FragmentLinkDirective, LinkDirective, RouterExtModule, injectRouter, provideRouterExt };
export type { RouterExtFeature };
