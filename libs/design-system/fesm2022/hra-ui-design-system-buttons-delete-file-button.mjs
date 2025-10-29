import * as i0 from '@angular/core';
import { input, output, ChangeDetectionStrategy, Component } from '@angular/core';
import * as i2 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i3 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import * as i1 from '@hra-ui/common/analytics';

/**
 * Button to give users an option to delete their file if they upload the wrong file
 */
class DeleteFileButtonComponent {
    /** File name */
    fileName = input.required(...(ngDevMode ? [{ debugName: "fileName" }] : []));
    /** Cancels load */
    cancelLoad = output();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: DeleteFileButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "20.3.9", type: DeleteFileButtonComponent, isStandalone: true, selector: "hra-delete-file-button", inputs: { fileName: { classPropertyName: "fileName", publicName: "fileName", isSignal: true, isRequired: true, transformFunction: null } }, outputs: { cancelLoad: "cancelLoad" }, ngImport: i0, template: "<span class=\"file-name\">{{ fileName() }}</span>\n<button mat-icon-button hraIconButtonSize=\"large\" aria-label=\"Delete file\" (click)=\"cancelLoad.emit()\">\n  <mat-icon hraFeature=\"delete\" hraClickEvent>delete</mat-icon>\n</button>\n", styles: [":host{width:fit-content;display:flex;align-items:center;gap:.25rem;padding-left:1.25rem;border-radius:2rem;color:var(--mat-sys-primary);background:var(--mat-sys-surface-container);font:var(--mat-sys-label-large);letter-spacing:var(--mat-sys-label-large-tracking)}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "ngmodule", type: MatButtonModule }, { kind: "component", type: i2.MatIconButton, selector: "button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]", exportAs: ["matButton", "matAnchor"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i3.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: DeleteFileButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-delete-file-button', imports: [HraCommonModule, MatButtonModule, MatIconModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<span class=\"file-name\">{{ fileName() }}</span>\n<button mat-icon-button hraIconButtonSize=\"large\" aria-label=\"Delete file\" (click)=\"cancelLoad.emit()\">\n  <mat-icon hraFeature=\"delete\" hraClickEvent>delete</mat-icon>\n</button>\n", styles: [":host{width:fit-content;display:flex;align-items:center;gap:.25rem;padding-left:1.25rem;border-radius:2rem;color:var(--mat-sys-primary);background:var(--mat-sys-surface-container);font:var(--mat-sys-label-large);letter-spacing:var(--mat-sys-label-large-tracking)}\n"] }]
        }], propDecorators: { fileName: [{ type: i0.Input, args: [{ isSignal: true, alias: "fileName", required: true }] }], cancelLoad: [{ type: i0.Output, args: ["cancelLoad"] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { DeleteFileButtonComponent };
//# sourceMappingURL=hra-ui-design-system-buttons-delete-file-button.mjs.map
