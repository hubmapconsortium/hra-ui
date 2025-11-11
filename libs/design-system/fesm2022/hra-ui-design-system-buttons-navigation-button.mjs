import * as i0 from '@angular/core';
import { input, booleanAttribute, ChangeDetectionStrategy, Component, Directive } from '@angular/core';
import * as i2 from '@angular/material/core';
import { MatRippleModule } from '@angular/material/core';
import { HraCommonModule } from '@hra-ui/common';
import * as i1 from '@hra-ui/common/analytics';

/**
 * Navigation button component for global navigation
 * Used in mega menus and mobile menu overlays
 */
class NavigationButtonComponent {
    /** Link URL for the navigation item */
    link = input.required(...(ngDevMode ? [{ debugName: "link" }] : []));
    /** Variant type (cta or menu-item) */
    variant = input('basic', ...(ngDevMode ? [{ debugName: "variant" }] : []));
    /** Whether to show indent instead */
    indented = input(false, ...(ngDevMode ? [{ debugName: "indented", transform: booleanAttribute }] : [{ transform: booleanAttribute }]));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: NavigationButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.9", type: NavigationButtonComponent, isStandalone: true, selector: "hra-navigation-button", inputs: { link: { classPropertyName: "link", publicName: "link", isSignal: true, isRequired: true, transformFunction: null }, variant: { classPropertyName: "variant", publicName: "variant", isSignal: true, isRequired: false, transformFunction: null }, indented: { classPropertyName: "indented", publicName: "indented", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "class": "\"hra-navigation-button-\" + variant()" } }, ngImport: i0, template: "<a matRipple hraFeature=\"navigation-button\" hraClickEvent [attr.href]=\"link()\">\n  <div class=\"content\">\n    @if (indented()) {\n      <div class=\"indent\"></div>\n    } @else {\n      <!-- Leading icon -->\n      <ng-content select=\"[hraNavigationIcon='leading']\" />\n    }\n\n    <div class=\"text-container\">\n      <!-- Tagline -->\n      <ng-content select=\"[hraNavigationButtonTagline]\" />\n\n      <!-- Description -->\n      <ng-content select=\"[hraNavigationButtonDescription]\" />\n    </div>\n\n    <!-- Trailing icon -->\n    <ng-content select=\"[hraNavigationIcon]:not([hraNavigationIcon='leading'])\" />\n  </div>\n</a>\n", styles: [":host{display:block}:host a{display:block;min-height:2.75rem;border-radius:.5rem;text-decoration:none;cursor:pointer}:host a:focus-visible{outline:2px solid var(--mat-sys-primary);outline-offset:-2px}:host a .content{display:flex;align-items:center;gap:.75rem}:host a .content:has(.supporting-text){align-items:flex-start}:host a .content .indent{width:1.5rem;height:1.5rem;flex-shrink:0}:host a .content .text-container{flex:1;display:flex;flex-direction:column;justify-content:center}:host a .content .text-container:has(.label){color:var(--mat-sys-secondary);font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking)}:host a .content .text-container:has(.supporting-text){color:var(--mat-sys-primary);font:var(--mat-sys-label-small);letter-spacing:var(--mat-sys-label-small-tracking);margin-top:.125rem}:host a .content:has(.leading-icon),:host a .content:has(.trailing-icon){color:var(--mat-sys-secondary);flex-shrink:0}:host.hra-navigation-button-basic a{padding:.5rem .75rem}:host.hra-navigation-button-basic a:hover{background-color:rgb(from var(--mat-sys-secondary) r g b/8%)}:host.hra-navigation-button-basic .text-container{gap:.125rem}:host.hra-navigation-button-cta a{padding:1rem;background-color:var(--mat-sys-surface-container-low);border:.0625rem solid var(--mat-sys-outline-variant)}:host.hra-navigation-button-cta a:hover{background-color:rgb(from var(--mat-sys-secondary) r g b/8%)}:host.hra-navigation-button-cta .text-container{gap:.25rem}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "ngmodule", type: MatRippleModule }, { kind: "directive", type: i2.MatRipple, selector: "[mat-ripple], [matRipple]", inputs: ["matRippleColor", "matRippleUnbounded", "matRippleCentered", "matRippleRadius", "matRippleAnimation", "matRippleDisabled", "matRippleTrigger"], exportAs: ["matRipple"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: NavigationButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-navigation-button', imports: [HraCommonModule, MatRippleModule], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[class]': '"hra-navigation-button-" + variant()',
                    }, template: "<a matRipple hraFeature=\"navigation-button\" hraClickEvent [attr.href]=\"link()\">\n  <div class=\"content\">\n    @if (indented()) {\n      <div class=\"indent\"></div>\n    } @else {\n      <!-- Leading icon -->\n      <ng-content select=\"[hraNavigationIcon='leading']\" />\n    }\n\n    <div class=\"text-container\">\n      <!-- Tagline -->\n      <ng-content select=\"[hraNavigationButtonTagline]\" />\n\n      <!-- Description -->\n      <ng-content select=\"[hraNavigationButtonDescription]\" />\n    </div>\n\n    <!-- Trailing icon -->\n    <ng-content select=\"[hraNavigationIcon]:not([hraNavigationIcon='leading'])\" />\n  </div>\n</a>\n", styles: [":host{display:block}:host a{display:block;min-height:2.75rem;border-radius:.5rem;text-decoration:none;cursor:pointer}:host a:focus-visible{outline:2px solid var(--mat-sys-primary);outline-offset:-2px}:host a .content{display:flex;align-items:center;gap:.75rem}:host a .content:has(.supporting-text){align-items:flex-start}:host a .content .indent{width:1.5rem;height:1.5rem;flex-shrink:0}:host a .content .text-container{flex:1;display:flex;flex-direction:column;justify-content:center}:host a .content .text-container:has(.label){color:var(--mat-sys-secondary);font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking)}:host a .content .text-container:has(.supporting-text){color:var(--mat-sys-primary);font:var(--mat-sys-label-small);letter-spacing:var(--mat-sys-label-small-tracking);margin-top:.125rem}:host a .content:has(.leading-icon),:host a .content:has(.trailing-icon){color:var(--mat-sys-secondary);flex-shrink:0}:host.hra-navigation-button-basic a{padding:.5rem .75rem}:host.hra-navigation-button-basic a:hover{background-color:rgb(from var(--mat-sys-secondary) r g b/8%)}:host.hra-navigation-button-basic .text-container{gap:.125rem}:host.hra-navigation-button-cta a{padding:1rem;background-color:var(--mat-sys-surface-container-low);border:.0625rem solid var(--mat-sys-outline-variant)}:host.hra-navigation-button-cta a:hover{background-color:rgb(from var(--mat-sys-secondary) r g b/8%)}:host.hra-navigation-button-cta .text-container{gap:.25rem}\n"] }]
        }], propDecorators: { link: [{ type: i0.Input, args: [{ isSignal: true, alias: "link", required: true }] }], variant: [{ type: i0.Input, args: [{ isSignal: true, alias: "variant", required: false }] }], indented: [{ type: i0.Input, args: [{ isSignal: true, alias: "indented", required: false }] }] } });

/**
 * Directive for navigation button description
 * Used for supporting text
 */
class NavigationButtonDescriptionDirective {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: NavigationButtonDescriptionDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.9", type: NavigationButtonDescriptionDirective, isStandalone: true, selector: "[hraNavigationButtonDescription]", host: { classAttribute: "supporting-text" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: NavigationButtonDescriptionDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[hraNavigationButtonDescription]',
                    host: {
                        class: 'supporting-text',
                    },
                }]
        }] });

/**
 * Directive for navigation button tagline
 * Used for the primary label text
 */
class NavigationButtonTaglineDirective {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: NavigationButtonTaglineDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.9", type: NavigationButtonTaglineDirective, isStandalone: true, selector: "[hraNavigationButtonTagline]", host: { classAttribute: "label" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: NavigationButtonTaglineDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[hraNavigationButtonTagline]',
                    host: {
                        class: 'label',
                    },
                }]
        }] });

/**
 * Directive for navigation button icons
 * Use with mat-icon
 */
class NavigationIconDirective {
    /** Icon position (leading or trailing) */
    hraNavigationIcon = input('trailing', ...(ngDevMode ? [{ debugName: "hraNavigationIcon" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: NavigationIconDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.9", type: NavigationIconDirective, isStandalone: true, selector: "[hraNavigationIcon]", inputs: { hraNavigationIcon: { classPropertyName: "hraNavigationIcon", publicName: "hraNavigationIcon", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "class.leading-icon": "hraNavigationIcon() === \"leading\"", "class.trailing-icon": "hraNavigationIcon() !== \"leading\"" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: NavigationIconDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[hraNavigationIcon]',
                    host: {
                        '[class.leading-icon]': 'hraNavigationIcon() === "leading"',
                        '[class.trailing-icon]': 'hraNavigationIcon() !== "leading"',
                    },
                }]
        }], propDecorators: { hraNavigationIcon: [{ type: i0.Input, args: [{ isSignal: true, alias: "hraNavigationIcon", required: false }] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { NavigationButtonComponent, NavigationButtonDescriptionDirective, NavigationButtonTaglineDirective, NavigationIconDirective };
//# sourceMappingURL=hra-ui-design-system-buttons-navigation-button.mjs.map
