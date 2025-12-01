import * as i0 from '@angular/core';
import { input, ChangeDetectionStrategy, Component } from '@angular/core';
import * as i2 from '@angular/material/core';
import { MatRippleModule } from '@angular/material/core';
import { HraCommonModule } from '@hra-ui/common';
import * as i1 from '@hra-ui/common/analytics';
import * as i3 from '@hra-ui/common/url';

/** Apps Card Component */
class AppNavButtonComponent {
    /** URL for the icon */
    icon = input.required(...(ngDevMode ? [{ debugName: "icon" }] : []));
    /** Title of the card */
    tagline = input.required(...(ngDevMode ? [{ debugName: "tagline" }] : []));
    /** Description of the card */
    description = input.required(...(ngDevMode ? [{ debugName: "description" }] : []));
    /** Link of the card */
    link = input.required(...(ngDevMode ? [{ debugName: "link" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: AppNavButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "20.3.12", type: AppNavButtonComponent, isStandalone: true, selector: "hra-app-nav-button", inputs: { icon: { classPropertyName: "icon", publicName: "icon", isSignal: true, isRequired: true, transformFunction: null }, tagline: { classPropertyName: "tagline", publicName: "tagline", isSignal: true, isRequired: true, transformFunction: null }, description: { classPropertyName: "description", publicName: "description", isSignal: true, isRequired: true, transformFunction: null }, link: { classPropertyName: "link", publicName: "link", isSignal: true, isRequired: true, transformFunction: null } }, ngImport: i0, template: "<a matRipple hraFeature=\"app-nav\" hraClickEvent target=\"_blank\" rel=\"noopener noreferrer\" [attr.href]=\"link()\">\n  <img class=\"icon\" alt=\"\" [attr.src]=\"icon() | assetUrl\" />\n  <span class=\"tagline\">{{ tagline() }}</span>\n  <span class=\"description\">{{ description() }}</span>\n</a>\n", styles: [":host{display:block}:host a{display:grid;grid-template:\"icon tagline\" \"icon description\"/min-content auto;column-gap:1rem;align-items:center;max-width:38rem;padding:var(--hra-app-nav-button-padding, .5rem);border-radius:.5rem;text-decoration:none}:host a:hover{background:rgb(from var(--mat-sys-secondary) r g b/8%)}:host a:active{background:rgb(from var(--mat-sys-secondary) r g b/16%)}:host a:focus-visible{outline:2px solid var(--mat-sys-tertiary);outline-offset:-2px}:host a .icon{grid-area:icon;height:3.5rem;width:3.5rem}:host a .tagline{grid-area:tagline;color:var(--mat-sys-secondary);font:var(--mat-sys-label-large);letter-spacing:var(--mat-sys-label-large-tracking)}:host a .description{grid-area:description;color:var(--mat-sys-inverse-surface);font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking)}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "ngmodule", type: MatRippleModule }, { kind: "directive", type: i2.MatRipple, selector: "[mat-ripple], [matRipple]", inputs: ["matRippleColor", "matRippleUnbounded", "matRippleCentered", "matRippleRadius", "matRippleAnimation", "matRippleDisabled", "matRippleTrigger"], exportAs: ["matRipple"] }, { kind: "pipe", type: i3.AssetUrlPipe, name: "assetUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: AppNavButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-app-nav-button', imports: [HraCommonModule, MatRippleModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<a matRipple hraFeature=\"app-nav\" hraClickEvent target=\"_blank\" rel=\"noopener noreferrer\" [attr.href]=\"link()\">\n  <img class=\"icon\" alt=\"\" [attr.src]=\"icon() | assetUrl\" />\n  <span class=\"tagline\">{{ tagline() }}</span>\n  <span class=\"description\">{{ description() }}</span>\n</a>\n", styles: [":host{display:block}:host a{display:grid;grid-template:\"icon tagline\" \"icon description\"/min-content auto;column-gap:1rem;align-items:center;max-width:38rem;padding:var(--hra-app-nav-button-padding, .5rem);border-radius:.5rem;text-decoration:none}:host a:hover{background:rgb(from var(--mat-sys-secondary) r g b/8%)}:host a:active{background:rgb(from var(--mat-sys-secondary) r g b/16%)}:host a:focus-visible{outline:2px solid var(--mat-sys-tertiary);outline-offset:-2px}:host a .icon{grid-area:icon;height:3.5rem;width:3.5rem}:host a .tagline{grid-area:tagline;color:var(--mat-sys-secondary);font:var(--mat-sys-label-large);letter-spacing:var(--mat-sys-label-large-tracking)}:host a .description{grid-area:description;color:var(--mat-sys-inverse-surface);font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking)}\n"] }]
        }], propDecorators: { icon: [{ type: i0.Input, args: [{ isSignal: true, alias: "icon", required: true }] }], tagline: [{ type: i0.Input, args: [{ isSignal: true, alias: "tagline", required: true }] }], description: [{ type: i0.Input, args: [{ isSignal: true, alias: "description", required: true }] }], link: [{ type: i0.Input, args: [{ isSignal: true, alias: "link", required: true }] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { AppNavButtonComponent };
//# sourceMappingURL=hra-ui-design-system-buttons-app-nav-button.mjs.map
