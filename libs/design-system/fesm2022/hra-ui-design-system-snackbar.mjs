import * as i0 from '@angular/core';
import { inject, ChangeDetectionStrategy, Component, Injectable } from '@angular/core';
import * as i2 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import * as i1 from '@hra-ui/common/analytics';
import * as i3 from '@angular/material/button';
import * as i4 from '@hra-ui/design-system/buttons/icon-button';
import * as i5 from '@hra-ui/design-system/buttons/button';

/** Snackbar component */
class SnackbarComponent {
    /** Reference to the MatSnackbarRef */
    snackbarRef = inject(MatSnackBarRef);
    /** Injection token for the snackbar data*/
    data = inject(MAT_SNACK_BAR_DATA);
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: SnackbarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.15", type: SnackbarComponent, isStandalone: true, selector: "hra-snackbar", ngImport: i0, template: "<ng-container hraFeature=\"snackbar\">\n  <span matSnackbarLabel class=\"label\">{{ data.message }}</span>\n  <div style=\"flex-grow: 1\"></div>\n  <div class=\"actions\">\n    @if (data.action) {\n      <span matSnackBarActions [class.position-end]=\"data.actionButtonPosition === 'end'\">\n        <button\n          mat-button\n          matSnackBarAction\n          hraFeature=\"action\"\n          hraClickEvent\n          hraButtonSize=\"medium\"\n          disableRipple\n          (click)=\"snackbarRef.dismissWithAction()\"\n        >\n          {{ data.action }}\n        </button>\n      </span>\n    }\n    @if (data.close) {\n      <button\n        mat-icon-button\n        hraFeature=\"close\"\n        hraClickEvent\n        hraIconButtonSize=\"large\"\n        data-testid=\"close-btn\"\n        (click)=\"snackbarRef.dismiss()\"\n      >\n        <mat-icon> close </mat-icon>\n      </button>\n    }\n  </div>\n</ng-container>\n", styles: [":host{display:flex;align-items:center;font:var(--mat-sys-label-medium);gap:.25rem}:host .label{padding:1rem}:host:has([matSnackBarActions]) .label{padding:.875rem .25rem .875rem 1rem}:host:has([matSnackBarActions]):has(.position-end) .label{padding:.875rem 1rem .5rem}:host:has(button[mat-icon-button]) .label{padding:.8438rem 1rem}:host:has(.position-end){flex-direction:column;gap:0}:host:has(.position-end) [matSnackBarLabel]{padding-top:.875rem;padding-bottom:.5rem}:host:has(.position-end) .actions{align-self:flex-end}:host .actions{display:flex;align-items:center}:host .actions .position-end{align-self:flex-end}:host .actions [matSnackBarActions]:not(:has(+button[mat-icon-button])){margin-right:.5rem}::ng-deep .hra-snackbar-panel{--mat-snack-bar-container-color: var(--mat-sys-inverse-surface);--mat-snack-bar-supporting-text-color: var(--mat-sys-surface);max-width:30rem}::ng-deep .hra-snackbar-panel .mat-mdc-snackbar-surface{padding:0;box-shadow:0 5px 16px rgb(from var(--mat-sys-secondary) r g b/.24)}::ng-deep .hra-snackbar-panel .mat-mdc-snackbar-surface .mat-mdc-snack-bar-label{padding:0}::ng-deep .hra-snackbar-panel button[mat-button][matSnackBarAction]{color:var(--mat-sys-inverse-primary)}::ng-deep .hra-snackbar-panel button[mat-icon-button]{--mat-icon-button-icon-color: var(--mat-sys-surface)}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: ButtonsModule }, { kind: "component", type: i3.MatButton, selector: "    button[matButton], a[matButton], button[mat-button], button[mat-raised-button],    button[mat-flat-button], button[mat-stroked-button], a[mat-button], a[mat-raised-button],    a[mat-flat-button], a[mat-stroked-button]  ", inputs: ["matButton"], exportAs: ["matButton", "matAnchor"] }, { kind: "component", type: i3.MatIconButton, selector: "button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]", exportAs: ["matButton", "matAnchor"] }, { kind: "directive", type: i4.IconButtonSizeDirective, selector: "[hraIconButtonSize]", inputs: ["hraIconButtonSize"] }, { kind: "directive", type: i5.ButtonSizeDirective, selector: "button[mat-button][hraButtonSize], button[mat-flat-button][hraButtonSize], a[mat-button][hraButtonSize]", inputs: ["hraButtonSize"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: SnackbarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-snackbar', imports: [HraCommonModule, MatIconModule, ButtonsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container hraFeature=\"snackbar\">\n  <span matSnackbarLabel class=\"label\">{{ data.message }}</span>\n  <div style=\"flex-grow: 1\"></div>\n  <div class=\"actions\">\n    @if (data.action) {\n      <span matSnackBarActions [class.position-end]=\"data.actionButtonPosition === 'end'\">\n        <button\n          mat-button\n          matSnackBarAction\n          hraFeature=\"action\"\n          hraClickEvent\n          hraButtonSize=\"medium\"\n          disableRipple\n          (click)=\"snackbarRef.dismissWithAction()\"\n        >\n          {{ data.action }}\n        </button>\n      </span>\n    }\n    @if (data.close) {\n      <button\n        mat-icon-button\n        hraFeature=\"close\"\n        hraClickEvent\n        hraIconButtonSize=\"large\"\n        data-testid=\"close-btn\"\n        (click)=\"snackbarRef.dismiss()\"\n      >\n        <mat-icon> close </mat-icon>\n      </button>\n    }\n  </div>\n</ng-container>\n", styles: [":host{display:flex;align-items:center;font:var(--mat-sys-label-medium);gap:.25rem}:host .label{padding:1rem}:host:has([matSnackBarActions]) .label{padding:.875rem .25rem .875rem 1rem}:host:has([matSnackBarActions]):has(.position-end) .label{padding:.875rem 1rem .5rem}:host:has(button[mat-icon-button]) .label{padding:.8438rem 1rem}:host:has(.position-end){flex-direction:column;gap:0}:host:has(.position-end) [matSnackBarLabel]{padding-top:.875rem;padding-bottom:.5rem}:host:has(.position-end) .actions{align-self:flex-end}:host .actions{display:flex;align-items:center}:host .actions .position-end{align-self:flex-end}:host .actions [matSnackBarActions]:not(:has(+button[mat-icon-button])){margin-right:.5rem}::ng-deep .hra-snackbar-panel{--mat-snack-bar-container-color: var(--mat-sys-inverse-surface);--mat-snack-bar-supporting-text-color: var(--mat-sys-surface);max-width:30rem}::ng-deep .hra-snackbar-panel .mat-mdc-snackbar-surface{padding:0;box-shadow:0 5px 16px rgb(from var(--mat-sys-secondary) r g b/.24)}::ng-deep .hra-snackbar-panel .mat-mdc-snackbar-surface .mat-mdc-snack-bar-label{padding:0}::ng-deep .hra-snackbar-panel button[mat-button][matSnackBarAction]{color:var(--mat-sys-inverse-primary)}::ng-deep .hra-snackbar-panel button[mat-icon-button]{--mat-icon-button-icon-color: var(--mat-sys-surface)}\n"] }]
        }] });

/** Service for snackbar. Opens the snackbar and configures it */
class SnackbarService {
    /** Reference to the MatSnackbar */
    matSnackbar = inject(MatSnackBar);
    /** Opens the snackbar with provided config */
    open(message, action, close = false, actionButtonPosition = 'start', config) {
        return this.matSnackbar.openFromComponent(SnackbarComponent, {
            announcementMessage: message,
            ...config,
            data: { message, action, close, actionButtonPosition },
            panelClass: ['hra-snackbar-panel'],
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: SnackbarService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: SnackbarService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: SnackbarService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { SnackbarComponent, SnackbarService };
//# sourceMappingURL=hra-ui-design-system-snackbar.mjs.map
