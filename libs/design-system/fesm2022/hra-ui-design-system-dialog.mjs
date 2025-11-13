import * as i0 from '@angular/core';
import { inject, ChangeDetectionStrategy, Component, Injectable } from '@angular/core';
import * as i3 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogTitle, MatDialogContent, MatDialogClose, MatDialog } from '@angular/material/dialog';
import * as i2 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import * as i1 from '@hra-ui/common/analytics';
import * as i4 from '@hra-ui/design-system/buttons/icon-button';
import * as i5 from '@hra-ui/design-system/buttons/button';

/** Notice Component */
class NoticeComponent {
    /** Instance of Mat Dialog Data */
    data = inject(MAT_DIALOG_DATA);
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: NoticeComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.11", type: NoticeComponent, isStandalone: true, selector: "hra-notice", ngImport: i0, template: "<ng-container hraFeature=\"notice\">\n  <div mat-dialog-title>\n    <div class=\"title\">\n      {{ data.title }}\n    </div>\n    <button\n      mat-icon-button\n      mat-dialog-close\n      hraFeature=\"close\"\n      hraClickEvent\n      hraIconButtonSize=\"large\"\n      disableRipple\n      data-testid=\"close-icon\"\n    >\n      <mat-icon class=\"material-symbols-rounded\">close</mat-icon>\n    </button>\n  </div>\n  <mat-dialog-content>{{ data.message }}</mat-dialog-content>\n  <mat-dialog-actions>\n    @if (data.action) {\n      <button\n        mat-button\n        class=\"action\"\n        hraFeature=\"action\"\n        hraClickEvent\n        hraButtonSize=\"medium\"\n        disableRipple\n        (click)=\"data.action.callback()\"\n      >\n        {{ data.action.label }}\n      </button>\n    }\n    <button\n      mat-button\n      mat-dialog-close\n      class=\"dismiss\"\n      hraFeature=\"close\"\n      hraClickEvent\n      hraButtonSize=\"medium\"\n      disableRipple\n    >\n      Dismiss\n    </button>\n  </mat-dialog-actions>\n</ng-container>\n", styles: [":host{display:block;--mat-dialog-actions-padding: 1.5rem 1rem 1rem 1rem;--mat-dialog-container-elevation-shadow: rgb(from var(--mat-sys-on-surface) r g b/24%);--mat-dialog-container-max-width: 29.5rem;--mat-dialog-container-min-width: 20rem;--mat-dialog-container-shape: 0;--mat-dialog-content-padding: 16px 16px 16px 24px;--mat-dialog-headline-padding: 0 0 0 24px;--mat-dialog-container-color: var(--mat-sys-surface-container-low)}:host:has(.action){--mat-dialog-actions-alignment: space-between}:host .mat-mdc-dialog-title{display:flex;align-items:center;justify-content:space-between;padding:0;margin-bottom:1rem}:host .mat-mdc-dialog-title .title{font:var(--mat-sys-title-medium);letter-spacing:var(--mat-sys-title-medium-tracking);margin-top:1.625rem;margin-left:1.5rem}:host .mat-mdc-dialog-title button[mat-icon-button]{margin:.875rem}:host .mat-mdc-dialog-title:before{display:none}:host .mat-mdc-dialog-content{font:var(--mat-sys-label-large);letter-spacing:var(--mat-sys-label-large-tracking);color:var(--mat-sys-primary);--mat-dialog-supporting-text-tracking: var(--mat-sys-body-large-tracking)}::ng-deep .hra-dialog-panel .mat-mdc-dialog-surface{border-radius:.5rem}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: ButtonsModule }, { kind: "component", type: i3.MatButton, selector: "    button[matButton], a[matButton], button[mat-button], button[mat-raised-button],    button[mat-flat-button], button[mat-stroked-button], a[mat-button], a[mat-raised-button],    a[mat-flat-button], a[mat-stroked-button]  ", inputs: ["matButton"], exportAs: ["matButton", "matAnchor"] }, { kind: "component", type: i3.MatIconButton, selector: "button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]", exportAs: ["matButton", "matAnchor"] }, { kind: "directive", type: i4.IconButtonSizeDirective, selector: "[hraIconButtonSize]", inputs: ["hraIconButtonSize"] }, { kind: "directive", type: i5.ButtonSizeDirective, selector: "button[mat-button][hraButtonSize], button[mat-flat-button][hraButtonSize], a[mat-button][hraButtonSize]", inputs: ["hraButtonSize"] }, { kind: "ngmodule", type: MatButtonModule }, { kind: "directive", type: MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]", inputs: ["align"] }, { kind: "directive", type: MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { kind: "directive", type: MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { kind: "directive", type: MatDialogClose, selector: "[mat-dialog-close], [matDialogClose]", inputs: ["aria-label", "type", "mat-dialog-close", "matDialogClose"], exportAs: ["matDialogClose"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: NoticeComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-notice', imports: [
                        HraCommonModule,
                        MatIconModule,
                        ButtonsModule,
                        MatButtonModule,
                        MatDialogActions,
                        MatDialogTitle,
                        MatDialogContent,
                        MatDialogClose,
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container hraFeature=\"notice\">\n  <div mat-dialog-title>\n    <div class=\"title\">\n      {{ data.title }}\n    </div>\n    <button\n      mat-icon-button\n      mat-dialog-close\n      hraFeature=\"close\"\n      hraClickEvent\n      hraIconButtonSize=\"large\"\n      disableRipple\n      data-testid=\"close-icon\"\n    >\n      <mat-icon class=\"material-symbols-rounded\">close</mat-icon>\n    </button>\n  </div>\n  <mat-dialog-content>{{ data.message }}</mat-dialog-content>\n  <mat-dialog-actions>\n    @if (data.action) {\n      <button\n        mat-button\n        class=\"action\"\n        hraFeature=\"action\"\n        hraClickEvent\n        hraButtonSize=\"medium\"\n        disableRipple\n        (click)=\"data.action.callback()\"\n      >\n        {{ data.action.label }}\n      </button>\n    }\n    <button\n      mat-button\n      mat-dialog-close\n      class=\"dismiss\"\n      hraFeature=\"close\"\n      hraClickEvent\n      hraButtonSize=\"medium\"\n      disableRipple\n    >\n      Dismiss\n    </button>\n  </mat-dialog-actions>\n</ng-container>\n", styles: [":host{display:block;--mat-dialog-actions-padding: 1.5rem 1rem 1rem 1rem;--mat-dialog-container-elevation-shadow: rgb(from var(--mat-sys-on-surface) r g b/24%);--mat-dialog-container-max-width: 29.5rem;--mat-dialog-container-min-width: 20rem;--mat-dialog-container-shape: 0;--mat-dialog-content-padding: 16px 16px 16px 24px;--mat-dialog-headline-padding: 0 0 0 24px;--mat-dialog-container-color: var(--mat-sys-surface-container-low)}:host:has(.action){--mat-dialog-actions-alignment: space-between}:host .mat-mdc-dialog-title{display:flex;align-items:center;justify-content:space-between;padding:0;margin-bottom:1rem}:host .mat-mdc-dialog-title .title{font:var(--mat-sys-title-medium);letter-spacing:var(--mat-sys-title-medium-tracking);margin-top:1.625rem;margin-left:1.5rem}:host .mat-mdc-dialog-title button[mat-icon-button]{margin:.875rem}:host .mat-mdc-dialog-title:before{display:none}:host .mat-mdc-dialog-content{font:var(--mat-sys-label-large);letter-spacing:var(--mat-sys-label-large-tracking);color:var(--mat-sys-primary);--mat-dialog-supporting-text-tracking: var(--mat-sys-body-large-tracking)}::ng-deep .hra-dialog-panel .mat-mdc-dialog-surface{border-radius:.5rem}\n"] }]
        }] });

/** Service to open dialog */
class DialogService {
    /** Instance of MatDialog */
    matDialog = inject(MatDialog);
    /** Opens the dialog with necessary data and config */
    openNotice(title, message, action) {
        return this.matDialog.open(NoticeComponent, {
            data: {
                title,
                message,
                action,
            },
            panelClass: 'hra-dialog-panel',
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: DialogService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: DialogService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: DialogService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { DialogService, NoticeComponent };
//# sourceMappingURL=hra-ui-design-system-dialog.mjs.map
