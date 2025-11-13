import * as i0 from '@angular/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import * as i3 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i5 from '@angular/router';
import { RouterModule } from '@angular/router';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import * as i1 from '@hra-ui/common/analytics';
import * as i2 from '@angular/material/button';
import * as i4 from '@hra-ui/design-system/buttons/button';

/**
 * Not Found Page Component
 * - Displays a 404 error page when the requested page is not found
 */
class NotFoundPageComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: NotFoundPageComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.11", type: NotFoundPageComponent, isStandalone: true, selector: "hra-not-found-page", ngImport: i0, template: "<div class=\"title\">This page isn't available</div>\n<div class=\"description\">Check the URL or start fresh from the homepage:</div>\n<a mat-button hraCtaButton hraPrimaryButton hraFeature=\"not-found-page\" hraClickEvent routerLink=\"/\">\n  Go to homepage\n  <mat-icon iconPositionEnd>arrow_right_alt</mat-icon>\n</a>\n", styles: [":host{display:flex;flex-direction:column;justify-content:center;align-items:center;padding:1rem 4rem;height:calc(100vh - 4.5rem);background-color:var(--mat-sys-secondary-container)}:host .title{font:var(--mat-sys-display-medium);letter-spacing:var(--mat-sys-display-medium-tracking);margin-bottom:.5rem;text-align:center}:host .description{font:var(--mat-sys-title-medium);letter-spacing:var(--mat-sys-title-medium-tracking);color:var(--mat-sys-primary);margin-bottom:4rem;text-align:center}@media only screen and (max-width:639px){:host{padding:1rem}}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "ngmodule", type: ButtonsModule }, { kind: "component", type: i2.MatButton, selector: "    button[matButton], a[matButton], button[mat-button], button[mat-raised-button],    button[mat-flat-button], button[mat-stroked-button], a[mat-button], a[mat-raised-button],    a[mat-flat-button], a[mat-stroked-button]  ", inputs: ["matButton"], exportAs: ["matButton", "matAnchor"] }, { kind: "component", type: i3.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "directive", type: i4.CtaButtonDirective, selector: "button[mat-button][hraCtaButton], a[mat-button][hraCtaButton]" }, { kind: "directive", type: i4.PrimaryButtonVariantDirective, selector: "button[mat-button][hraPrimaryButton], a[mat-button][hraPrimaryButton]" }, { kind: "ngmodule", type: MatIconModule }, { kind: "ngmodule", type: RouterModule }, { kind: "directive", type: i5.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "info", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: NotFoundPageComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-not-found-page', imports: [HraCommonModule, ButtonsModule, MatIconModule, RouterModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"title\">This page isn't available</div>\n<div class=\"description\">Check the URL or start fresh from the homepage:</div>\n<a mat-button hraCtaButton hraPrimaryButton hraFeature=\"not-found-page\" hraClickEvent routerLink=\"/\">\n  Go to homepage\n  <mat-icon iconPositionEnd>arrow_right_alt</mat-icon>\n</a>\n", styles: [":host{display:flex;flex-direction:column;justify-content:center;align-items:center;padding:1rem 4rem;height:calc(100vh - 4.5rem);background-color:var(--mat-sys-secondary-container)}:host .title{font:var(--mat-sys-display-medium);letter-spacing:var(--mat-sys-display-medium-tracking);margin-bottom:.5rem;text-align:center}:host .description{font:var(--mat-sys-title-medium);letter-spacing:var(--mat-sys-title-medium-tracking);color:var(--mat-sys-primary);margin-bottom:4rem;text-align:center}@media only screen and (max-width:639px){:host{padding:1rem}}\n"] }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { NotFoundPageComponent };
//# sourceMappingURL=hra-ui-design-system-error-pages-not-found-page.mjs.map
