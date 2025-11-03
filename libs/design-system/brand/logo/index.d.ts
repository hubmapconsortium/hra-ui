import * as _hra_ui_common_injectors from '@hra-ui/common/injectors';
import * as _angular_core from '@angular/core';
import { SVGScriptEvalMode } from 'ng-inline-svg-2';
import { z } from 'zod';

/** Brand Logo Component */
declare class BrandLogoComponent {
    /** Size of the logo */
    readonly size: _angular_core.InputSignal<"regular" | "small">;
    /** Logos from app configuration, or use default ones */
    readonly logos: _angular_core.InputSignal<_hra_ui_common_injectors.BrandLogo[]>;
    /** SVG script eval mode */
    protected readonly NEVER_EVAL_SCRIPTS = SVGScriptEvalMode.NEVER;
    /** Logo data */
    protected readonly data: _angular_core.Signal<_hra_ui_common_injectors.BrandLogo>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<BrandLogoComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<BrandLogoComponent, "hra-brand-logo", never, { "size": { "alias": "size"; "required": false; "isSignal": true; }; "logos": { "alias": "logos"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

/** Logo size */
type BrandLogoSize = z.infer<typeof BrandLogoSizeSchema>;
/** Schema for logo size */
declare const BrandLogoSizeSchema: z.ZodEnum<{
    regular: "regular";
    small: "small";
}>;

export { BrandLogoComponent };
export type { BrandLogoSize };
