import * as _angular_core from '@angular/core';
import { SVGScriptEvalMode } from 'ng-inline-svg-2';
import * as z from 'zod';

/**
 * HRA brandmark component
 */
declare class BrandMarkComponent {
    /** Mark variant */
    readonly variant: _angular_core.InputSignal<"default" | "contrast" | "small">;
    /** SVG script eval mode */
    protected readonly NEVER_EVAL_SCRIPTS = SVGScriptEvalMode.NEVER;
    /** Mark data */
    protected readonly data: _angular_core.Signal<{
        variant: "default" | "contrast" | "small";
        src: string;
        width: number;
        height: number;
    }>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<BrandMarkComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<BrandMarkComponent, "hra-brand-mark", never, { "variant": { "alias": "variant"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

/** Mark variant */
type BrandMarkVariant = z.infer<typeof BrandMarkVariantSchema>;
/** Schema for mark variant */
declare const BrandMarkVariantSchema: z.ZodEnum<{
    default: "default";
    contrast: "contrast";
    small: "small";
}>;

export { BrandMarkComponent };
export type { BrandMarkVariant };
