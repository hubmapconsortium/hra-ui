import { createInjectionToken } from 'ngxtension/create-injection-token';
import * as i0 from '@angular/core';
import { input, computed, ChangeDetectionStrategy, Component } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { findOrThrow } from '@hra-ui/common/array-util';
import * as i1 from 'ng-inline-svg-2';
import { InlineSVGModule } from 'ng-inline-svg-2';
import * as i2 from '@hra-ui/common/url';

/** Default marks for applications */
const DEFAULT_MARKS = [
    {
        variant: 'default',
        src: 'assets/brand/mark/default.svg',
        width: 226,
        height: 226,
    },
    {
        variant: 'contrast',
        src: 'assets/brand/mark/contrast.svg',
        width: 226,
        height: 226,
    },
    {
        variant: 'small',
        src: 'assets/brand/mark/small.svg',
        width: 40,
        height: 40,
    },
];
/** Injection token for brand marks configuration */
const BRAND_MARKS = createInjectionToken(() => DEFAULT_MARKS);
/** Inject the brand marks configuration */
const injectBrandMarks = BRAND_MARKS[0];
/** Set the brand marks configuration */
const provideBrandMarks = BRAND_MARKS[1];

/**
 * HRA brandmark component
 */
class BrandMarkComponent {
    /** Mark variant */
    variant = input('default', ...(ngDevMode ? [{ debugName: "variant" }] : []));
    /** Marks from injection token */
    marks = input(injectBrandMarks(), ...(ngDevMode ? [{ debugName: "marks" }] : []));
    /** SVG script eval mode */
    NEVER_EVAL_SCRIPTS = "never" /* SVGScriptEvalMode.NEVER */;
    /** Mark data */
    data = computed(() => findOrThrow(this.marks(), ({ variant }) => variant === this.variant()), ...(ngDevMode ? [{ debugName: "data" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: BrandMarkComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "20.3.15", type: BrandMarkComponent, isStandalone: true, selector: "hra-brand-mark", inputs: { variant: { classPropertyName: "variant", publicName: "variant", isSignal: true, isRequired: false, transformFunction: null }, marks: { classPropertyName: "marks", publicName: "marks", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<div\n  class=\"hra-brandmark\"\n  aria-label=\"Human Reference Atlas brandmark\"\n  [inlineSVG]=\"data().src | assetUrl\"\n  [evalScripts]=\"NEVER_EVAL_SCRIPTS\"\n  [style.width.px]=\"data().width\"\n  [style.height.px]=\"data().height\"\n></div>\n", styles: [":host{color:var(--hra-brand-mark-color, var(--mat-sys-tertiary))}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "ngmodule", type: InlineSVGModule }, { kind: "directive", type: i1.InlineSVGDirective, selector: "[inlineSVG]", inputs: ["inlineSVG", "resolveSVGUrl", "replaceContents", "prepend", "injectComponent", "cacheSVG", "setSVGAttributes", "removeSVGAttributes", "forceEvalStyles", "evalScripts", "fallbackImgUrl", "fallbackSVG", "onSVGLoaded"], outputs: ["onSVGInserted", "onSVGFailed"] }, { kind: "pipe", type: i2.AssetUrlPipe, name: "assetUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: BrandMarkComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-brand-mark', imports: [HraCommonModule, InlineSVGModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  class=\"hra-brandmark\"\n  aria-label=\"Human Reference Atlas brandmark\"\n  [inlineSVG]=\"data().src | assetUrl\"\n  [evalScripts]=\"NEVER_EVAL_SCRIPTS\"\n  [style.width.px]=\"data().width\"\n  [style.height.px]=\"data().height\"\n></div>\n", styles: [":host{color:var(--hra-brand-mark-color, var(--mat-sys-tertiary))}\n"] }]
        }], propDecorators: { variant: [{ type: i0.Input, args: [{ isSignal: true, alias: "variant", required: false }] }], marks: [{ type: i0.Input, args: [{ isSignal: true, alias: "marks", required: false }] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { BrandMarkComponent, provideBrandMarks };
//# sourceMappingURL=hra-ui-design-system-brand-mark.mjs.map
