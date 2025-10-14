import * as _angular_core from '@angular/core';
import { SVGScriptEvalMode } from 'ng-inline-svg-2';
import { z } from 'zod';

/** Brand Logo Component */
declare class BrandLogoComponent {
    /** Size of the logo */
    readonly size: _angular_core.InputSignal<"small" | "regular">;
    /** SVG script eval mode */
    protected readonly NEVER_EVAL_SCRIPTS = SVGScriptEvalMode.NEVER;
    /** Logo data */
    protected readonly data: _angular_core.Signal<{
        size: "small" | "regular";
        src: string;
        width: number;
        height: number;
    }>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<BrandLogoComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<BrandLogoComponent, "hra-brand-logo", never, { "size": { "alias": "size"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

/** Logo size */
type BrandLogoSize = z.infer<typeof BrandLogoSizeSchema>;
/** Schema for logo size */
declare const BrandLogoSizeSchema: z.ZodEnum<{
    small: "small";
    regular: "regular";
}>;

export { BrandLogoComponent };
export type { BrandLogoSize };
