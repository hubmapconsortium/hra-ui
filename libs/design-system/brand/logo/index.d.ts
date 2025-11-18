import * as ngxtension_create_injection_token from 'ngxtension/create-injection-token';
import * as _angular_core from '@angular/core';
import { SVGScriptEvalMode } from 'ng-inline-svg-2';

/** Brand logo size */
type BrandLogoSize = 'regular' | 'small';
/** Brand logo */
interface BrandLogo {
    /** Logo size */
    size: BrandLogoSize;
    /** Logo source url */
    src: string;
    /** Logo width */
    width: number;
    /** Logo height */
    height: number;
}
/** Injection token for brand logos configuration */
declare const BRAND_LOGOS: ngxtension_create_injection_token.CreateInjectionTokenReturn<BrandLogo[], false>;
/** Set the brand logos configuration */
declare const provideBrandLogos: (logos: BrandLogo[]) => ReturnType<(typeof BRAND_LOGOS)[1]>;

/** Brand logo */
/** Brand Logo Component */
declare class BrandLogoComponent {
    /** Size of the logo */
    readonly size: _angular_core.InputSignal<BrandLogoSize>;
    /** Logos from injection token */
    readonly logos: _angular_core.InputSignal<BrandLogo[]>;
    /** SVG script eval mode */
    protected readonly NEVER_EVAL_SCRIPTS = SVGScriptEvalMode.NEVER;
    /** Logo data */
    protected readonly data: _angular_core.Signal<BrandLogo>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<BrandLogoComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<BrandLogoComponent, "hra-brand-logo", never, { "size": { "alias": "size"; "required": false; "isSignal": true; }; "logos": { "alias": "logos"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

export { BrandLogoComponent, provideBrandLogos };
