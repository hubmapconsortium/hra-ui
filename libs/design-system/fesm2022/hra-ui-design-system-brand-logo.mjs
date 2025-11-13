import * as i0 from '@angular/core';
import { input, computed, ChangeDetectionStrategy, Component } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { findOrThrow } from '@hra-ui/common/array-util';
import { injectAppConfiguration } from '@hra-ui/common/injectors';
import * as i2 from 'ng-inline-svg-2';
import { InlineSVGModule } from 'ng-inline-svg-2';
import * as i1 from '@hra-ui/common/analytics';
import * as i3 from '@hra-ui/common/url';

/** Default logos for applications */
const DEFAULT_LOGOS = [
    {
        size: 'regular',
        src: 'assets/brand/logo/regular.svg',
        width: 178,
        height: 74,
    },
    {
        size: 'small',
        src: 'assets/brand/logo/small.svg',
        width: 116,
        height: 48,
    },
];

/** Brand Logo Component */
class BrandLogoComponent {
    /** Size of the logo */
    size = input('regular', ...(ngDevMode ? [{ debugName: "size" }] : []));
    /** Logos from app configuration, or use default ones */
    logos = input(injectAppConfiguration().logos ?? DEFAULT_LOGOS, ...(ngDevMode ? [{ debugName: "logos" }] : []));
    /** SVG script eval mode */
    NEVER_EVAL_SCRIPTS = "never" /* SVGScriptEvalMode.NEVER */;
    /** Logo data */
    data = computed(() => findOrThrow(this.logos(), ({ size }) => size === this.size()), ...(ngDevMode ? [{ debugName: "data" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: BrandLogoComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "20.3.11", type: BrandLogoComponent, isStandalone: true, selector: "hra-brand-logo", inputs: { size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null }, logos: { classPropertyName: "logos", publicName: "logos", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "class": "\"hra-brand-logo-size-\" + size()" } }, ngImport: i0, template: "<a\n  class=\"logo\"\n  hraFeature=\"logo\"\n  hraClickEvent\n  aria-label=\"Visit Human Reference Atlas\"\n  href=\"https://humanatlas.io/\"\n  target=\"_self\"\n  [inlineSVG]=\"data().src | assetUrl\"\n  [evalScripts]=\"NEVER_EVAL_SCRIPTS\"\n  [style.width.px]=\"data().width\"\n  [style.height.px]=\"data().height\"\n>\n</a>\n", styles: [":host{display:block;color:var(--hra-brand-logo-text-color, var(--mat-sys-on-surface))}:host .logo{display:block;color:inherit}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "ngmodule", type: InlineSVGModule }, { kind: "directive", type: i2.InlineSVGDirective, selector: "[inlineSVG]", inputs: ["inlineSVG", "resolveSVGUrl", "replaceContents", "prepend", "injectComponent", "cacheSVG", "setSVGAttributes", "removeSVGAttributes", "forceEvalStyles", "evalScripts", "fallbackImgUrl", "fallbackSVG", "onSVGLoaded"], outputs: ["onSVGInserted", "onSVGFailed"] }, { kind: "pipe", type: i3.AssetUrlPipe, name: "assetUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: BrandLogoComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-brand-logo', imports: [HraCommonModule, InlineSVGModule], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[class]': '"hra-brand-logo-size-" + size()',
                    }, template: "<a\n  class=\"logo\"\n  hraFeature=\"logo\"\n  hraClickEvent\n  aria-label=\"Visit Human Reference Atlas\"\n  href=\"https://humanatlas.io/\"\n  target=\"_self\"\n  [inlineSVG]=\"data().src | assetUrl\"\n  [evalScripts]=\"NEVER_EVAL_SCRIPTS\"\n  [style.width.px]=\"data().width\"\n  [style.height.px]=\"data().height\"\n>\n</a>\n", styles: [":host{display:block;color:var(--hra-brand-logo-text-color, var(--mat-sys-on-surface))}:host .logo{display:block;color:inherit}\n"] }]
        }], propDecorators: { size: [{ type: i0.Input, args: [{ isSignal: true, alias: "size", required: false }] }], logos: [{ type: i0.Input, args: [{ isSignal: true, alias: "logos", required: false }] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { BrandLogoComponent };
//# sourceMappingURL=hra-ui-design-system-brand-logo.mjs.map
