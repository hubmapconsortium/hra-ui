import * as i0 from '@angular/core';
import { input, inject, Component } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconsModule } from '@hra-ui/design-system/icons';
import { SnackbarService } from '@hra-ui/design-system/snackbar';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import * as i1 from '@hra-ui/common/analytics';
import * as i2 from '@angular/material/button';
import * as i3 from '@angular/material/icon';

/**
 * Contains a url link and a button to copy it to the clipboard.
 */
class CopyableUrlContainerComponent {
    /** Url to display */
    url = input.required(...(ngDevMode ? [{ debugName: "url" }] : []));
    /** Snackbar service */
    snackbar = inject(SnackbarService);
    /**
     * Copys url to clipboard and shows a snackbar notification.
     */
    copyUrl() {
        navigator.clipboard.writeText(this.url());
        this.snackbar.open('Link copied', '', false, 'start', { duration: 5000 });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: CopyableUrlContainerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "20.3.11", type: CopyableUrlContainerComponent, isStandalone: true, selector: "hra-copyable-url-container", inputs: { url: { classPropertyName: "url", publicName: "url", isSignal: true, isRequired: true, transformFunction: null } }, ngImport: i0, template: "<ng-container hraFeature=\"copyable-url\">\n  <div class=\"link\">\n    <a\n      mat-icon-button\n      hraClickEvent\n      target=\"_blank\"\n      rel=\"noopener noreferrer\"\n      hraPlainTooltip=\"Open in new tab\"\n      [attr.href]=\"url()\"\n    >\n      <mat-icon>open_in_new</mat-icon>\n    </a>\n    <span class=\"text\">\n      {{ url() }}\n    </span>\n  </div>\n  <button\n    mat-button\n    hraFeature=\"copy\"\n    class=\"copy\"\n    hraPlainTooltip=\"Copy link\"\n    [hraClickEvent]=\"{ url: url() }\"\n    (click)=\"copyUrl()\"\n  >\n    <mat-icon>content_copy</mat-icon>\n    Copy\n  </button>\n</ng-container>\n", styles: [":host{display:flex;align-items:flex-start;gap:.25rem;flex-direction:column}@media(min-width:362px){:host{flex-direction:row}}:host .link{font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking);padding-right:1rem;display:flex;gap:.125rem;border-radius:2rem;background-color:var(--mat-sys-surface-container);min-width:16.25rem}:host .link mat-icon{min-width:1.5rem}:host .text{color:var(--mat-sys-primary);padding:.625rem 0}:host .copy{font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking);min-width:auto;border-radius:2rem}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "ngmodule", type: ButtonsModule }, { kind: "component", type: i2.MatButton, selector: "    button[matButton], a[matButton], button[mat-button], button[mat-raised-button],    button[mat-flat-button], button[mat-stroked-button], a[mat-button], a[mat-raised-button],    a[mat-flat-button], a[mat-stroked-button]  ", inputs: ["matButton"], exportAs: ["matButton", "matAnchor"] }, { kind: "component", type: i2.MatIconButton, selector: "button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]", exportAs: ["matButton", "matAnchor"] }, { kind: "component", type: i3.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: IconsModule }, { kind: "directive", type: PlainTooltipDirective, selector: "[hraPlainTooltip]", inputs: ["hraPlainTooltipSize"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: CopyableUrlContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-copyable-url-container', imports: [HraCommonModule, ButtonsModule, IconsModule, PlainTooltipDirective], template: "<ng-container hraFeature=\"copyable-url\">\n  <div class=\"link\">\n    <a\n      mat-icon-button\n      hraClickEvent\n      target=\"_blank\"\n      rel=\"noopener noreferrer\"\n      hraPlainTooltip=\"Open in new tab\"\n      [attr.href]=\"url()\"\n    >\n      <mat-icon>open_in_new</mat-icon>\n    </a>\n    <span class=\"text\">\n      {{ url() }}\n    </span>\n  </div>\n  <button\n    mat-button\n    hraFeature=\"copy\"\n    class=\"copy\"\n    hraPlainTooltip=\"Copy link\"\n    [hraClickEvent]=\"{ url: url() }\"\n    (click)=\"copyUrl()\"\n  >\n    <mat-icon>content_copy</mat-icon>\n    Copy\n  </button>\n</ng-container>\n", styles: [":host{display:flex;align-items:flex-start;gap:.25rem;flex-direction:column}@media(min-width:362px){:host{flex-direction:row}}:host .link{font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking);padding-right:1rem;display:flex;gap:.125rem;border-radius:2rem;background-color:var(--mat-sys-surface-container);min-width:16.25rem}:host .link mat-icon{min-width:1.5rem}:host .text{color:var(--mat-sys-primary);padding:.625rem 0}:host .copy{font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking);min-width:auto;border-radius:2rem}\n"] }]
        }], propDecorators: { url: [{ type: i0.Input, args: [{ isSignal: true, alias: "url", required: true }] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { CopyableUrlContainerComponent };
//# sourceMappingURL=hra-ui-design-system-copyable-url-container.mjs.map
