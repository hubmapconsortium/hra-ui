import * as ngxtension_create_injection_token from 'ngxtension/create-injection-token';
import * as _angular_core from '@angular/core';
import { SVGScriptEvalMode } from 'ng-inline-svg-2';

/** Brand mark variant */
type BrandMarkVariant = 'default' | 'contrast' | 'small';
/** Brand mark */
interface BrandMark {
    /** Mark variant */
    variant: BrandMarkVariant;
    /** Mark source url */
    src: string;
    /** Mark width */
    width: number;
    /** Mark height */
    height: number;
}
/** Injection token for brand marks configuration */
declare const BRAND_MARKS: ngxtension_create_injection_token.CreateInjectionTokenReturn<BrandMark[], false>;
/** Set the brand marks configuration */
declare const provideBrandMarks: (marks: BrandMark[]) => ReturnType<(typeof BRAND_MARKS)[1]>;

/**
 * HRA brandmark component
 */
declare class BrandMarkComponent {
    /** Mark variant */
    readonly variant: _angular_core.InputSignal<BrandMarkVariant>;
    /** Marks from injection token */
    readonly marks: _angular_core.InputSignal<BrandMark[]>;
    /** SVG script eval mode */
    protected readonly NEVER_EVAL_SCRIPTS = SVGScriptEvalMode.NEVER;
    /** Mark data */
    protected readonly data: _angular_core.Signal<BrandMark>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<BrandMarkComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<BrandMarkComponent, "hra-brand-mark", never, { "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "marks": { "alias": "marks"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

export { BrandMarkComponent, provideBrandMarks };
