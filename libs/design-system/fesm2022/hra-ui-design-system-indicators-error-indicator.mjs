import * as i0 from '@angular/core';
import { input, booleanAttribute, ChangeDetectionStrategy, Component } from '@angular/core';
import * as i2 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { TextHyperlinkDirective } from '@hra-ui/design-system/buttons/text-hyperlink';
import * as i1 from '@hra-ui/common/analytics';

/** Error Indicator component */
class ErrorIndicatorComponent {
    /** List of errors to be shown in the indicator */
    errors = input(...(ngDevMode ? [undefined, { debugName: "errors" }] : []));
    /** Material icon shown before the errors, such as `warning` for problems that aren't critical */
    icon = input('error', ...(ngDevMode ? [{ debugName: "icon" }] : []));
    /**
     * Whether screen readers announce the errors as soon as they appear. Use it for errors shown after an action,
     * such as a failed upload, but not for messages shown on page load.
     */
    announce = input(false, { ...(ngDevMode ? { debugName: "announce" } : {}), transform: booleanAttribute });
    /** Call to action link */
    actionLink = input(...(ngDevMode ? [undefined, { debugName: "actionLink" }] : []));
    /** Call to action link label */
    actionLinkLabel = input(...(ngDevMode ? [undefined, { debugName: "actionLinkLabel" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.1.5", ngImport: i0, type: ErrorIndicatorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.1.5", type: ErrorIndicatorComponent, isStandalone: true, selector: "hra-error-indicator", inputs: { errors: { classPropertyName: "errors", publicName: "errors", isSignal: true, isRequired: false, transformFunction: null }, icon: { classPropertyName: "icon", publicName: "icon", isSignal: true, isRequired: false, transformFunction: null }, announce: { classPropertyName: "announce", publicName: "announce", isSignal: true, isRequired: false, transformFunction: null }, actionLink: { classPropertyName: "actionLink", publicName: "actionLink", isSignal: true, isRequired: false, transformFunction: null }, actionLinkLabel: { classPropertyName: "actionLinkLabel", publicName: "actionLinkLabel", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "attr.role": "announce() ? \"alert\" : null" } }, ngImport: i0, template: "<mat-icon>{{ icon() }}</mat-icon>\n<div class=\"errors\" hraFeature=\"error-indicator\">\n  @for (error of errors(); track error) {\n    <div class=\"error\">\n      {{ error }}\n    </div>\n  }\n  @if (actionLink()) {\n    <a class=\"link\" hraHyperlink [attr.href]=\"actionLink()\">{{ actionLinkLabel() }}</a>\n  }\n</div>\n", styles: [":host{display:flex;width:fit-content;padding:.5rem .75rem;border-radius:.25rem;color:var(--mat-sys-on-error-container);background-color:color-mix(in srgb,var(--mat-sys-error-container) 80%,transparent)}:host mat-icon{margin-right:.5rem;color:var(--mat-sys-error);min-width:1.5rem}:host .error{font:var(--mat-sys-label-large);letter-spacing:var(--mat-sys-label-large-tracking)}:host .link{font:var(--mat-sys-label-large);letter-spacing:var(--mat-sys-label-large-tracking)}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "directive", type: TextHyperlinkDirective, selector: "a[hraHyperlink]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.1.5", ngImport: i0, type: ErrorIndicatorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-error-indicator', imports: [HraCommonModule, MatIconModule, TextHyperlinkDirective], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[attr.role]': 'announce() ? "alert" : null',
                    }, template: "<mat-icon>{{ icon() }}</mat-icon>\n<div class=\"errors\" hraFeature=\"error-indicator\">\n  @for (error of errors(); track error) {\n    <div class=\"error\">\n      {{ error }}\n    </div>\n  }\n  @if (actionLink()) {\n    <a class=\"link\" hraHyperlink [attr.href]=\"actionLink()\">{{ actionLinkLabel() }}</a>\n  }\n</div>\n", styles: [":host{display:flex;width:fit-content;padding:.5rem .75rem;border-radius:.25rem;color:var(--mat-sys-on-error-container);background-color:color-mix(in srgb,var(--mat-sys-error-container) 80%,transparent)}:host mat-icon{margin-right:.5rem;color:var(--mat-sys-error);min-width:1.5rem}:host .error{font:var(--mat-sys-label-large);letter-spacing:var(--mat-sys-label-large-tracking)}:host .link{font:var(--mat-sys-label-large);letter-spacing:var(--mat-sys-label-large-tracking)}\n"] }]
        }], propDecorators: { errors: [{ type: i0.Input, args: [{ isSignal: true, alias: "errors", required: false }] }], icon: [{ type: i0.Input, args: [{ isSignal: true, alias: "icon", required: false }] }], announce: [{ type: i0.Input, args: [{ isSignal: true, alias: "announce", required: false }] }], actionLink: [{ type: i0.Input, args: [{ isSignal: true, alias: "actionLink", required: false }] }], actionLinkLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "actionLinkLabel", required: false }] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { ErrorIndicatorComponent };
//# sourceMappingURL=hra-ui-design-system-indicators-error-indicator.mjs.map
