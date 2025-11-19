import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { input, output, ChangeDetectionStrategy, Component } from '@angular/core';
import * as i1 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import * as i2 from '@angular/material/button';
import * as i3 from '@hra-ui/design-system/buttons/text-hyperlink';

/** A call to action bar that can be displayed at top of the page */
class CtaBarComponent {
    /** Action button text */
    action = input.required(...(ngDevMode ? [{ debugName: "action" }] : []));
    /** Action description */
    description = input.required(...(ngDevMode ? [{ debugName: "description" }] : []));
    /** Url to visit when action button is clicked */
    url = input.required(...(ngDevMode ? [{ debugName: "url" }] : []));
    /** Emits when the close button is clicked */
    closeClick = output();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: CtaBarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "20.3.12", type: CtaBarComponent, isStandalone: true, selector: "hra-cta-bar", inputs: { action: { classPropertyName: "action", publicName: "action", isSignal: true, isRequired: true, transformFunction: null }, description: { classPropertyName: "description", publicName: "description", isSignal: true, isRequired: true, transformFunction: null }, url: { classPropertyName: "url", publicName: "url", isSignal: true, isRequired: true, transformFunction: null } }, outputs: { closeClick: "closeClick" }, ngImport: i0, template: "<div class=\"content\">\n  <span class=\"description\">{{ description() }}</span>\n  <a hraHyperlink class=\"action\" target=\"_blank\" rel=\"noopener noreferrer\" [attr.href]=\"url()\">\n    {{ action() }}\n    <mat-icon>arrow_right_alt</mat-icon>\n  </a>\n</div>\n\n<button mat-icon-button class=\"close\" aria-label=\"Hide the call to action bar\" (click)=\"closeClick.emit()\">\n  <mat-icon>close</mat-icon>\n</button>\n", styles: [":host{display:flex;padding:.25rem .75rem .25rem 0;background-color:rgb(from var(--mat-sys-on-tertiary-fixed) r g b/8%)}:host .content{display:flex;flex-direction:column;flex-grow:1;font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking)}:host .content .description{color:var(--mat-sys-primary);padding:.5rem 0 0 1rem}:host .content .action{display:flex;align-items:center;gap:.25rem;height:2.5rem;padding:0 1rem}@media(min-width:535px){:host .content{flex-direction:row;justify-content:center;align-items:center;padding:0 1rem 0 0}:host .content .description{padding:0}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i1.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: ButtonsModule }, { kind: "component", type: i2.MatIconButton, selector: "button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]", exportAs: ["matButton", "matAnchor"] }, { kind: "directive", type: i3.TextHyperlinkDirective, selector: "a[hraHyperlink]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: CtaBarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-cta-bar', imports: [CommonModule, MatIconModule, ButtonsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"content\">\n  <span class=\"description\">{{ description() }}</span>\n  <a hraHyperlink class=\"action\" target=\"_blank\" rel=\"noopener noreferrer\" [attr.href]=\"url()\">\n    {{ action() }}\n    <mat-icon>arrow_right_alt</mat-icon>\n  </a>\n</div>\n\n<button mat-icon-button class=\"close\" aria-label=\"Hide the call to action bar\" (click)=\"closeClick.emit()\">\n  <mat-icon>close</mat-icon>\n</button>\n", styles: [":host{display:flex;padding:.25rem .75rem .25rem 0;background-color:rgb(from var(--mat-sys-on-tertiary-fixed) r g b/8%)}:host .content{display:flex;flex-direction:column;flex-grow:1;font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking)}:host .content .description{color:var(--mat-sys-primary);padding:.5rem 0 0 1rem}:host .content .action{display:flex;align-items:center;gap:.25rem;height:2.5rem;padding:0 1rem}@media(min-width:535px){:host .content{flex-direction:row;justify-content:center;align-items:center;padding:0 1rem 0 0}:host .content .description{padding:0}}\n"] }]
        }], propDecorators: { action: [{ type: i0.Input, args: [{ isSignal: true, alias: "action", required: true }] }], description: [{ type: i0.Input, args: [{ isSignal: true, alias: "description", required: true }] }], url: [{ type: i0.Input, args: [{ isSignal: true, alias: "url", required: true }] }], closeClick: [{ type: i0.Output, args: ["closeClick"] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { CtaBarComponent };
//# sourceMappingURL=hra-ui-design-system-navigation-cta-bar.mjs.map
