import * as i0 from '@angular/core';
import { input, ChangeDetectionStrategy, Component } from '@angular/core';
import * as i3 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i5 from '@angular/router';
import { RouterModule } from '@angular/router';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { Highlight } from 'ngx-highlightjs';
import * as i1 from '@hra-ui/common/analytics';
import * as i2 from '@angular/material/button';
import * as i4 from '@hra-ui/design-system/buttons/button';

/**
 * Redirect Page Component
 * - Displays a loading page with an indeterminate progress spinner while redirecting
 */
class ArchivedPageComponent {
    /** Path of the archived page that the user is requesting */
    archivedPath = input.required(...(ngDevMode ? [{ debugName: "archivedPath" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: ArchivedPageComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "20.3.12", type: ArchivedPageComponent, isStandalone: true, selector: "hra-archived-page", inputs: { archivedPath: { classPropertyName: "archivedPath", publicName: "archivedPath", isSignal: true, isRequired: true, transformFunction: null } }, ngImport: i0, template: "<div class=\"url\">https://cns.iu.edu/{{ archivedPath() }}</div>\n<div class=\"title\">This page has been archived</div>\n<div class=\"description\">Try searching the URL online or visit our new research database.</div>\n<div class=\"actions\">\n  <a mat-button hraCtaButton hraPrimaryButton hraFeature=\"archived-page\" hraClickEvent routerLink=\"/research\">\n    Explore research\n    <mat-icon iconPositionEnd>arrow_right_alt</mat-icon>\n  </a>\n  <a mat-button hraCtaButton hraSecondaryButton hraFeature=\"archived-page\" hraClickEvent routerLink=\"/\">\n    Go to homepage\n    <mat-icon iconPositionEnd>arrow_right_alt</mat-icon>\n  </a>\n</div>\n", styles: [":host{display:flex;flex-direction:column;justify-content:center;align-items:center;padding:1rem 4rem;height:calc(100vh - 4.5rem);background-color:var(--mat-sys-secondary-container)}:host .url{font:var(--mat-sys-title-large);letter-spacing:var(--mat-sys-title-large-tracking);color:var(--mat-sys-primary);margin-bottom:1.5rem;text-align:center}:host .title{font:var(--mat-sys-display-medium);letter-spacing:var(--mat-sys-display-medium-tracking);margin-bottom:.5rem;text-align:center}:host .description{font:var(--mat-sys-title-medium);letter-spacing:var(--mat-sys-title-medium-tracking);color:var(--mat-sys-primary);margin-bottom:4rem;text-align:center}:host .actions{display:flex;gap:2rem}@media only screen and (max-width:639px){:host{padding:1rem}}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "ngmodule", type: ButtonsModule }, { kind: "component", type: i2.MatButton, selector: "    button[matButton], a[matButton], button[mat-button], button[mat-raised-button],    button[mat-flat-button], button[mat-stroked-button], a[mat-button], a[mat-raised-button],    a[mat-flat-button], a[mat-stroked-button]  ", inputs: ["matButton"], exportAs: ["matButton", "matAnchor"] }, { kind: "component", type: i3.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "directive", type: i4.CtaButtonDirective, selector: "button[mat-button][hraCtaButton], a[mat-button][hraCtaButton]" }, { kind: "directive", type: i4.PrimaryButtonVariantDirective, selector: "button[mat-button][hraPrimaryButton], a[mat-button][hraPrimaryButton]" }, { kind: "directive", type: i4.SecondaryButtonVariantDirective, selector: "button[mat-button][hraSecondaryButton], a[mat-button][hraSecondaryButton]" }, { kind: "ngmodule", type: MatIconModule }, { kind: "ngmodule", type: RouterModule }, { kind: "directive", type: i5.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: ArchivedPageComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-archived-page', imports: [HraCommonModule, ButtonsModule, MatIconModule, RouterModule, Highlight], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"url\">https://cns.iu.edu/{{ archivedPath() }}</div>\n<div class=\"title\">This page has been archived</div>\n<div class=\"description\">Try searching the URL online or visit our new research database.</div>\n<div class=\"actions\">\n  <a mat-button hraCtaButton hraPrimaryButton hraFeature=\"archived-page\" hraClickEvent routerLink=\"/research\">\n    Explore research\n    <mat-icon iconPositionEnd>arrow_right_alt</mat-icon>\n  </a>\n  <a mat-button hraCtaButton hraSecondaryButton hraFeature=\"archived-page\" hraClickEvent routerLink=\"/\">\n    Go to homepage\n    <mat-icon iconPositionEnd>arrow_right_alt</mat-icon>\n  </a>\n</div>\n", styles: [":host{display:flex;flex-direction:column;justify-content:center;align-items:center;padding:1rem 4rem;height:calc(100vh - 4.5rem);background-color:var(--mat-sys-secondary-container)}:host .url{font:var(--mat-sys-title-large);letter-spacing:var(--mat-sys-title-large-tracking);color:var(--mat-sys-primary);margin-bottom:1.5rem;text-align:center}:host .title{font:var(--mat-sys-display-medium);letter-spacing:var(--mat-sys-display-medium-tracking);margin-bottom:.5rem;text-align:center}:host .description{font:var(--mat-sys-title-medium);letter-spacing:var(--mat-sys-title-medium-tracking);color:var(--mat-sys-primary);margin-bottom:4rem;text-align:center}:host .actions{display:flex;gap:2rem}@media only screen and (max-width:639px){:host{padding:1rem}}\n"] }]
        }], propDecorators: { archivedPath: [{ type: i0.Input, args: [{ isSignal: true, alias: "archivedPath", required: true }] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { ArchivedPageComponent };
//# sourceMappingURL=hra-ui-design-system-error-pages-archived-page.mjs.map
