import * as i0 from '@angular/core';
import { input, output, ChangeDetectionStrategy, Component } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import * as i2 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i3 from '@angular/material/divider';
import { MatDividerModule } from '@angular/material/divider';
import * as i4 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i1 from '@hra-ui/common/analytics';

/**
 * Modal to display an image with a title.
 */
class ImageModalComponent {
    /** Label to display as the modal title */
    modalTitle = input.required(...(ngDevMode ? [{ debugName: "modalTitle" }] : []));
    /** URL of the image to display */
    imageUrl = input.required(...(ngDevMode ? [{ debugName: "imageUrl" }] : []));
    /** Alt text for the image */
    altText = input('', ...(ngDevMode ? [{ debugName: "altText" }] : []));
    /** Emits when close icon clicked */
    // eslint-disable-next-line @angular-eslint/no-output-native
    close = output();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ImageModalComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "20.3.15", type: ImageModalComponent, isStandalone: true, selector: "hra-image-modal", inputs: { modalTitle: { classPropertyName: "modalTitle", publicName: "modalTitle", isSignal: true, isRequired: true, transformFunction: null }, imageUrl: { classPropertyName: "imageUrl", publicName: "imageUrl", isSignal: true, isRequired: true, transformFunction: null }, altText: { classPropertyName: "altText", publicName: "altText", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { close: "close" }, ngImport: i0, template: "<ng-container hraFeature=\"image-modal\">\n  <h2 class=\"header\">\n    <span class=\"card-title\">Preview: {{ modalTitle() }}</span>\n    <div class=\"filler\"></div>\n    <button mat-icon-button class=\"close\" hraFeature=\"close\" hraClickEvent (click)=\"close.emit()\">\n      <mat-icon>close</mat-icon>\n    </button>\n  </h2>\n\n  <mat-divider />\n\n  <img class=\"preview-image\" [attr.src]=\"imageUrl()\" [attr.alt]=\"altText()\" />\n</ng-container>\n", styles: [":host{display:flex;flex-direction:column;max-height:calc(100vh - 1rem);max-width:calc(100vw - 1rem);box-shadow:0 5px 1rem rgb(from var(--mat-sys-shadow) r g b/.24);border-radius:.5rem;background-color:var(--mat-sys-surface-container-low);overflow:hidden}:host .header{display:flex;align-items:center;height:3.5rem;margin:0;padding:0 1rem}:host .header .card-title{margin-right:.75rem;font:var(--mat-sys-label-large)}:host .header .filler{flex-grow:1}:host .preview-image{max-width:100%;flex:1;min-height:0}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "ngmodule", type: MatButtonModule }, { kind: "component", type: i2.MatIconButton, selector: "button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]", exportAs: ["matButton", "matAnchor"] }, { kind: "ngmodule", type: MatDividerModule }, { kind: "component", type: i3.MatDivider, selector: "mat-divider", inputs: ["vertical", "inset"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i4.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ImageModalComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-image-modal', imports: [HraCommonModule, MatButtonModule, MatDividerModule, MatIconModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container hraFeature=\"image-modal\">\n  <h2 class=\"header\">\n    <span class=\"card-title\">Preview: {{ modalTitle() }}</span>\n    <div class=\"filler\"></div>\n    <button mat-icon-button class=\"close\" hraFeature=\"close\" hraClickEvent (click)=\"close.emit()\">\n      <mat-icon>close</mat-icon>\n    </button>\n  </h2>\n\n  <mat-divider />\n\n  <img class=\"preview-image\" [attr.src]=\"imageUrl()\" [attr.alt]=\"altText()\" />\n</ng-container>\n", styles: [":host{display:flex;flex-direction:column;max-height:calc(100vh - 1rem);max-width:calc(100vw - 1rem);box-shadow:0 5px 1rem rgb(from var(--mat-sys-shadow) r g b/.24);border-radius:.5rem;background-color:var(--mat-sys-surface-container-low);overflow:hidden}:host .header{display:flex;align-items:center;height:3.5rem;margin:0;padding:0 1rem}:host .header .card-title{margin-right:.75rem;font:var(--mat-sys-label-large)}:host .header .filler{flex-grow:1}:host .preview-image{max-width:100%;flex:1;min-height:0}\n"] }]
        }], propDecorators: { modalTitle: [{ type: i0.Input, args: [{ isSignal: true, alias: "modalTitle", required: true }] }], imageUrl: [{ type: i0.Input, args: [{ isSignal: true, alias: "imageUrl", required: true }] }], altText: [{ type: i0.Input, args: [{ isSignal: true, alias: "altText", required: false }] }], close: [{ type: i0.Output, args: ["close"] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { ImageModalComponent };
//# sourceMappingURL=hra-ui-design-system-modal-image-modal.mjs.map
