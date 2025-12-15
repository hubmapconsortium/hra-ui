import * as i0 from '@angular/core';
import { input, ChangeDetectionStrategy, Component } from '@angular/core';
import { ProgressSpinnerComponent } from '@hra-ui/design-system/indicators/progress-spinner';
import { TextHyperlinkComponent } from '@hra-ui/design-system/buttons/text-hyperlink';

/**
 * Redirect Page Component
 * - Displays a loading page with an indeterminate progress spinner while redirecting
 */
class RedirectPageComponent {
    /** URL that the user is being redirected to */
    redirectUrl = input.required(...(ngDevMode ? [{ debugName: "redirectUrl" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: RedirectPageComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "20.3.15", type: RedirectPageComponent, isStandalone: true, selector: "hra-redirect-page", inputs: { redirectUrl: { classPropertyName: "redirectUrl", publicName: "redirectUrl", isSignal: true, isRequired: true, transformFunction: null } }, ngImport: i0, template: "<hra-progress-spinner color=\"color\" size=\"large\" />\n<div class=\"title\">Redirecting...</div>\n<div class=\"description\">Redirecting to</div>\n<hra-text-hyperlink class=\"url\" [url]=\"redirectUrl()\" [text]=\"redirectUrl()\" />\n", styles: [":host{display:flex;flex-direction:column;justify-content:center;align-items:center;padding:1rem 4rem;height:calc(100vh - 4.5rem);background-color:var(--mat-sys-secondary-container)}:host hra-progress-spinner{margin-bottom:.5rem}:host .title{font:var(--mat-sys-display-medium);letter-spacing:var(--mat-sys-display-medium-tracking);color:var(--mat-sys-secondary);margin-bottom:4rem;text-align:center}:host .description{font:var(--mat-sys-title-medium);letter-spacing:var(--mat-sys-title-medium-tracking);color:var(--mat-sys-primary);margin-bottom:.5rem;text-align:center}:host .url{font:var(--mat-sys-body-xl);letter-spacing:var(--mat-sys-body-xl-tracking)}@media only screen and (max-width:639px){:host{padding:1rem}}\n"], dependencies: [{ kind: "component", type: ProgressSpinnerComponent, selector: "hra-progress-spinner", inputs: ["size", "color"] }, { kind: "component", type: TextHyperlinkComponent, selector: "hra-text-hyperlink", inputs: ["text", "url", "icon", "external"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: RedirectPageComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-redirect-page', imports: [ProgressSpinnerComponent, TextHyperlinkComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<hra-progress-spinner color=\"color\" size=\"large\" />\n<div class=\"title\">Redirecting...</div>\n<div class=\"description\">Redirecting to</div>\n<hra-text-hyperlink class=\"url\" [url]=\"redirectUrl()\" [text]=\"redirectUrl()\" />\n", styles: [":host{display:flex;flex-direction:column;justify-content:center;align-items:center;padding:1rem 4rem;height:calc(100vh - 4.5rem);background-color:var(--mat-sys-secondary-container)}:host hra-progress-spinner{margin-bottom:.5rem}:host .title{font:var(--mat-sys-display-medium);letter-spacing:var(--mat-sys-display-medium-tracking);color:var(--mat-sys-secondary);margin-bottom:4rem;text-align:center}:host .description{font:var(--mat-sys-title-medium);letter-spacing:var(--mat-sys-title-medium-tracking);color:var(--mat-sys-primary);margin-bottom:.5rem;text-align:center}:host .url{font:var(--mat-sys-body-xl);letter-spacing:var(--mat-sys-body-xl-tracking)}@media only screen and (max-width:639px){:host{padding:1rem}}\n"] }]
        }], propDecorators: { redirectUrl: [{ type: i0.Input, args: [{ isSignal: true, alias: "redirectUrl", required: true }] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { RedirectPageComponent };
//# sourceMappingURL=hra-ui-design-system-error-pages-redirect-page.mjs.map
