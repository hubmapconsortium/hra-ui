import * as i0 from '@angular/core';
import { ChangeDetectionStrategy, Component, input, output, NgModule } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import * as i3 from '@angular/material/divider';
import { MatDividerModule } from '@angular/material/divider';
import * as i2 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import * as i1 from '@hra-ui/common/analytics';
import * as i4 from '@angular/material/button';
import * as i5 from '@hra-ui/design-system/buttons/help-button';

/**
 * Component representing the footer of a flat card.
 */
class FlatCardActionsComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: FlatCardActionsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.9", type: FlatCardActionsComponent, isStandalone: true, selector: "hra-flat-card-actions", ngImport: i0, template: `<ng-content></ng-content>`, isInline: true, styles: [":host{display:flex;width:100%}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: FlatCardActionsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-flat-card-actions', standalone: true, template: `<ng-content></ng-content>`, changeDetection: ChangeDetectionStrategy.OnPush, styles: [":host{display:flex;width:100%}\n"] }]
        }] });
/**
 * Component representing a flat card component.
 * Displays an header including component title, optional help icon, clsoing icon, placeholder for content, and an optional footer.
 */
class FlatCardComponent {
    /** Title of the card */
    tagline = input.required(...(ngDevMode ? [{ debugName: "tagline" }] : []));
    /** Optional help icon */
    showHelpButton = input(false, ...(ngDevMode ? [{ debugName: "showHelpButton" }] : []));
    /** Help icon button link */
    helpLink = input('', ...(ngDevMode ? [{ debugName: "helpLink" }] : []));
    /** Optional divider */
    showDivider = input(false, ...(ngDevMode ? [{ debugName: "showDivider" }] : []));
    /** Optional footer content */
    showButtonsFooter = input(false, ...(ngDevMode ? [{ debugName: "showButtonsFooter" }] : []));
    /** Emits when the close button is clicked */
    closeClick = output();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: FlatCardComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.9", type: FlatCardComponent, isStandalone: true, selector: "hra-flat-card", inputs: { tagline: { classPropertyName: "tagline", publicName: "tagline", isSignal: true, isRequired: true, transformFunction: null }, showHelpButton: { classPropertyName: "showHelpButton", publicName: "showHelpButton", isSignal: true, isRequired: false, transformFunction: null }, helpLink: { classPropertyName: "helpLink", publicName: "helpLink", isSignal: true, isRequired: false, transformFunction: null }, showDivider: { classPropertyName: "showDivider", publicName: "showDivider", isSignal: true, isRequired: false, transformFunction: null }, showButtonsFooter: { classPropertyName: "showButtonsFooter", publicName: "showButtonsFooter", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { closeClick: "closeClick" }, ngImport: i0, template: "<div class=\"component-tagline\">\n  <span class=\"component-title\">{{ tagline() }}</span>\n  @if (showHelpButton()) {\n    <hra-help-button [action]=\"helpLink()\"></hra-help-button>\n  }\n  <div class=\"filler\"></div>\n  <button\n    hraClickEvent\n    hraFeature=\"close\"\n    mat-icon-button\n    class=\"closeButton\"\n    aria-label=\"Close card\"\n    (click)=\"closeClick.emit()\"\n  >\n    <mat-icon>close</mat-icon>\n  </button>\n</div>\n@if (showDivider()) {\n  <mat-divider class=\"top-divider\"></mat-divider>\n}\n\n<div class=\"card-content\">\n  <ng-content></ng-content>\n</div>\n\n@if (showButtonsFooter()) {\n  <div class=\"card-footer\">\n    <ng-content select=\"hra-flat-card-actions\"></ng-content>\n  </div>\n}\n", styles: [":host{display:flex;flex-direction:column;height:100%;min-width:19.5rem;box-shadow:0 .3125rem 1rem rgb(from var(--mat-sys-on-background) r g b/.24);background-color:var(--mat-sys-surface-container-low)}:host .component-tagline{display:flex;align-items:center;padding:.75rem 1rem}:host .component-tagline .component-title{font:var(--mat-sys-title-medium);letter-spacing:var(--mat-sys-title-medium-tracking);color:var(--mat-sys-on-background)}:host .component-tagline .helpButton{background-color:var(--mat-sys-surface-container-low)}:host .top-divider{color:var(--mat-sys-outline-variant)}:host .card-content{padding:1rem;flex-grow:1}:host .card-footer{height:4.5rem;border-top:.0625rem solid var(--mat-sys-outline-variant);background-color:var(--mat-sys-surface-container-low);display:flex;justify-content:space-between;padding:1rem}:host .filler{flex-grow:1}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: MatMenuModule }, { kind: "ngmodule", type: MatDividerModule }, { kind: "component", type: i3.MatDivider, selector: "mat-divider", inputs: ["vertical", "inset"] }, { kind: "ngmodule", type: ButtonsModule }, { kind: "component", type: i4.MatIconButton, selector: "button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]", exportAs: ["matButton", "matAnchor"] }, { kind: "component", type: i5.HelpButtonComponent, selector: "hra-help-button", inputs: ["action"] }, { kind: "ngmodule", type: ScrollingModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: FlatCardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-flat-card', standalone: true, imports: [HraCommonModule, MatIconModule, MatMenuModule, MatDividerModule, ButtonsModule, ScrollingModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"component-tagline\">\n  <span class=\"component-title\">{{ tagline() }}</span>\n  @if (showHelpButton()) {\n    <hra-help-button [action]=\"helpLink()\"></hra-help-button>\n  }\n  <div class=\"filler\"></div>\n  <button\n    hraClickEvent\n    hraFeature=\"close\"\n    mat-icon-button\n    class=\"closeButton\"\n    aria-label=\"Close card\"\n    (click)=\"closeClick.emit()\"\n  >\n    <mat-icon>close</mat-icon>\n  </button>\n</div>\n@if (showDivider()) {\n  <mat-divider class=\"top-divider\"></mat-divider>\n}\n\n<div class=\"card-content\">\n  <ng-content></ng-content>\n</div>\n\n@if (showButtonsFooter()) {\n  <div class=\"card-footer\">\n    <ng-content select=\"hra-flat-card-actions\"></ng-content>\n  </div>\n}\n", styles: [":host{display:flex;flex-direction:column;height:100%;min-width:19.5rem;box-shadow:0 .3125rem 1rem rgb(from var(--mat-sys-on-background) r g b/.24);background-color:var(--mat-sys-surface-container-low)}:host .component-tagline{display:flex;align-items:center;padding:.75rem 1rem}:host .component-tagline .component-title{font:var(--mat-sys-title-medium);letter-spacing:var(--mat-sys-title-medium-tracking);color:var(--mat-sys-on-background)}:host .component-tagline .helpButton{background-color:var(--mat-sys-surface-container-low)}:host .top-divider{color:var(--mat-sys-outline-variant)}:host .card-content{padding:1rem;flex-grow:1}:host .card-footer{height:4.5rem;border-top:.0625rem solid var(--mat-sys-outline-variant);background-color:var(--mat-sys-surface-container-low);display:flex;justify-content:space-between;padding:1rem}:host .filler{flex-grow:1}\n"] }]
        }], propDecorators: { tagline: [{ type: i0.Input, args: [{ isSignal: true, alias: "tagline", required: true }] }], showHelpButton: [{ type: i0.Input, args: [{ isSignal: true, alias: "showHelpButton", required: false }] }], helpLink: [{ type: i0.Input, args: [{ isSignal: true, alias: "helpLink", required: false }] }], showDivider: [{ type: i0.Input, args: [{ isSignal: true, alias: "showDivider", required: false }] }], showButtonsFooter: [{ type: i0.Input, args: [{ isSignal: true, alias: "showButtonsFooter", required: false }] }], closeClick: [{ type: i0.Output, args: ["closeClick"] }] } });

/** All re-exported modules, components, directives, etc. */
const REEXPORTS = [FlatCardComponent, FlatCardActionsComponent];
class FlatCardModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: FlatCardModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.9", ngImport: i0, type: FlatCardModule, imports: [FlatCardComponent, FlatCardActionsComponent], exports: [FlatCardComponent, FlatCardActionsComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: FlatCardModule, imports: [FlatCardComponent] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: FlatCardModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: REEXPORTS,
                    exports: REEXPORTS,
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { FlatCardActionsComponent, FlatCardComponent, FlatCardModule };
//# sourceMappingURL=hra-ui-design-system-cards-flat-card.mjs.map
