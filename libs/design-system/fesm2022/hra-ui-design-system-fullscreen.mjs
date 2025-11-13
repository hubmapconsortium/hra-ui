import * as i0 from '@angular/core';
import { input, inject, ViewContainerRef, effect, Directive, ChangeDetectionStrategy, Component, output, computed, DestroyRef, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import * as i2 from '@angular/material/dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import * as i3 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import * as i5 from '@hra-ui/design-system/expansion-panel';
import { ExpansionPanelModule } from '@hra-ui/design-system/expansion-panel';
import { pipe, filter } from 'rxjs';
import * as i1 from '@hra-ui/common/analytics';
import * as i4 from '@angular/material/button';

/** View outlet directive */
class ViewOutletDirective {
    /** view reference input */
    viewRef = input(undefined, ...(ngDevMode ? [{ debugName: "viewRef", alias: 'hraViewOutlet' }] : [{ alias: 'hraViewOutlet' }]));
    /** Reference of the view container */
    viewContainerRef = inject(ViewContainerRef);
    /** Attaches the view */
    constructor() {
        effect(() => this.attach());
    }
    /** Attaches the view to the view container */
    attach() {
        const viewRef = this.viewRef();
        if (viewRef) {
            this.viewContainerRef.insert(viewRef);
        }
    }
    /** Detaches the view from the view container */
    detach() {
        const viewRef = this.viewRef();
        const index = viewRef ? this.viewContainerRef.indexOf(viewRef) : -1;
        if (index >= 0) {
            this.viewContainerRef.detach(index);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: ViewOutletDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.11", type: ViewOutletDirective, isStandalone: true, selector: "[hraViewOutlet]", inputs: { viewRef: { classPropertyName: "viewRef", publicName: "hraViewOutlet", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: ViewOutletDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[hraViewOutlet]',
                }]
        }], ctorParameters: () => [], propDecorators: { viewRef: [{ type: i0.Input, args: [{ isSignal: true, alias: "hraViewOutlet", required: false }] }] } });
/** Fullscreen actions component */
class FullscreenActionsComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: FullscreenActionsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.11", type: FullscreenActionsComponent, isStandalone: true, selector: "hra-fullscreen-actions", ngImport: i0, template: `<ng-content />`, isInline: true, styles: [":host{display:flex;width:100%;height:100%;flex-direction:row;align-items:center}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: FullscreenActionsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-fullscreen-actions', template: `<ng-content />`, changeDetection: ChangeDetectionStrategy.OnPush, styles: [":host{display:flex;width:100%;height:100%;flex-direction:row;align-items:center}\n"] }]
        }] });
/** Fullscreen portal content component */
class FullscreenPortalContentComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: FullscreenPortalContentComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.11", type: FullscreenPortalContentComponent, isStandalone: true, selector: "hra-fullscreen-portal-content", ngImport: i0, template: `<ng-content />`, isInline: true, styles: [":host{width:100%;height:100%}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: FullscreenPortalContentComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-fullscreen-portal-content', template: `<ng-content />`, changeDetection: ChangeDetectionStrategy.OnPush, styles: [":host{width:100%;height:100%}\n"] }]
        }] });
/** Fullscreen Component */
class FullscreenPortalComponent {
    /** Heading of the dialog */
    tagline = input.required(...(ngDevMode ? [{ debugName: "tagline" }] : []));
    /** Classes to apply to the dialog panel in fullscreen mode */
    panelClass = input(...(ngDevMode ? [undefined, { debugName: "panelClass" }] : []));
    /** Event for before the dialog is opened */
    beforeOpened = output();
    /** Event for when the dialog is opened */
    opened = output();
    /** Event for before the dialog is closed */
    beforeClosed = output();
    /** Event for when the dialog is closed */
    closed = output();
    /** Creates embedded view using template */
    viewRef = computed(() => {
        return this.viewContainerRef.createEmbeddedView(this.contentTemplateRef());
    }, ...(ngDevMode ? [{ debugName: "viewRef" }] : []));
    /** Rootnodes of the view reference */
    rootNodes = computed(() => this.viewRef().rootNodes, ...(ngDevMode ? [{ debugName: "rootNodes" }] : []));
    /** Reference to the mat dialog */
    dialogService = inject(MatDialog);
    /** Reference to the view container */
    viewContainerRef = inject(ViewContainerRef);
    /** Reference to the destroy ref */
    destroyRef = inject(DestroyRef);
    /** Reference to the view outlet directive */
    viewOutlet = viewChild.required(ViewOutletDirective);
    /** Reference to the view content template */
    contentTemplateRef = viewChild.required('contentTemplate');
    /** Reference to the view dialog template */
    dialogTemplateRef = viewChild.required('dialogTemplate');
    /** Reference to the mat dialog */
    dialogRef;
    /** Destroys the view */
    constructor() {
        this.destroyRef.onDestroy(() => {
            const dialogRef = this.dialogRef;
            this.dialogRef = undefined;
            dialogRef?.close();
            this.viewRef().destroy();
        });
    }
    /** Detaches the view from histogram module and attaches it to the view in the dialog */
    open() {
        if (this.dialogRef !== undefined) {
            return;
        }
        const { dialogService, dialogTemplateRef } = this;
        const panelClass = this.panelClass() ?? [];
        const normalizedPanelClass = typeof panelClass === 'string' ? panelClass.split(' ') : panelClass;
        this.beforeOpened.emit();
        const dialogRef = (this.dialogRef = dialogService.open(dialogTemplateRef(), {
            panelClass: [...normalizedPanelClass, 'fullscreen-panel'],
        }));
        dialogRef
            .afterOpened()
            .pipe(this.filterDialogEvents(dialogRef))
            .subscribe(() => {
            this.opened.emit();
        });
        dialogRef
            .beforeClosed()
            .pipe(this.filterDialogEvents(dialogRef))
            .subscribe(() => {
            this.beforeClosed.emit();
            this.viewOutlet().attach();
        });
        dialogRef
            .afterClosed()
            .pipe(this.filterDialogEvents(dialogRef))
            .subscribe(() => {
            this.dialogRef = undefined;
            this.closed.emit();
        });
    }
    /** Closes the dialog */
    close() {
        this.dialogRef?.close();
    }
    /** Filters the dialog event based on provided dialog reference */
    filterDialogEvents(dialogRef) {
        return pipe(takeUntilDestroyed(this.destroyRef), filter(() => this.dialogRef === dialogRef));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: FullscreenPortalComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.2.0", version: "20.3.11", type: FullscreenPortalComponent, isStandalone: true, selector: "hra-fullscreen-portal", inputs: { tagline: { classPropertyName: "tagline", publicName: "tagline", isSignal: true, isRequired: true, transformFunction: null }, panelClass: { classPropertyName: "panelClass", publicName: "panelClass", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { beforeOpened: "beforeOpened", opened: "opened", beforeClosed: "beforeClosed", closed: "closed" }, viewQueries: [{ propertyName: "viewOutlet", first: true, predicate: ViewOutletDirective, descendants: true, isSignal: true }, { propertyName: "contentTemplateRef", first: true, predicate: ["contentTemplate"], descendants: true, isSignal: true }, { propertyName: "dialogTemplateRef", first: true, predicate: ["dialogTemplate"], descendants: true, isSignal: true }], ngImport: i0, template: "<ng-template [hraViewOutlet]=\"viewRef()\" />\n\n<ng-template #contentTemplate>\n  <ng-content select=\"hra-fullscreen-portal-content\" />\n</ng-template>\n\n<ng-template #dialogTemplate>\n  <hra-expansion-panel hraFeature=\"fullscreen\" disabled [tagline]=\"tagline()\">\n    <hra-expansion-panel-actions>\n      <ng-content select=\"hra-fullscreen-actions\" />\n    </hra-expansion-panel-actions>\n\n    <hra-expansion-panel-header-content>\n      <button mat-icon-button mat-dialog-close hraFeature=\"close\" hraClickEvent>\n        <mat-icon class=\"material-symbols-rounded\"> close </mat-icon>\n      </button>\n    </hra-expansion-panel-header-content>\n\n    <ng-template data-testid=\"fullscreen-outlet\" [hraViewOutlet]=\"viewRef()\" />\n  </hra-expansion-panel>\n</ng-template>\n", styles: [":host{display:block}::ng-deep .fullscreen-panel{width:100%;height:100%;--mat-dialog-container-max-width: 100%;--mat-dialog-container-color: white;--mat-dialog-container-shape: 0}::ng-deep .fullscreen-panel .header{padding:.75rem 1rem}::ng-deep .fullscreen-panel .content{height:calc(100vh - 5rem)}::ng-deep .fullscreen-panel .content .expansion-body{height:100%;width:100%}::ng-deep .fullscreen-panel hra-expansion-panel-header-content{height:100%;width:100%;text-align:right}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "ngmodule", type: MatDialogModule }, { kind: "directive", type: i2.MatDialogClose, selector: "[mat-dialog-close], [matDialogClose]", inputs: ["aria-label", "type", "mat-dialog-close", "matDialogClose"], exportAs: ["matDialogClose"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i3.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: ButtonsModule }, { kind: "component", type: i4.MatIconButton, selector: "button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]", exportAs: ["matButton", "matAnchor"] }, { kind: "ngmodule", type: ExpansionPanelModule }, { kind: "component", type: i5.ExpansionPanelActionsComponent, selector: "hra-expansion-panel-actions" }, { kind: "component", type: i5.ExpansionPanelHeaderContentComponent, selector: "hra-expansion-panel-header-content" }, { kind: "component", type: i5.ExpansionPanelComponent, selector: "hra-expansion-panel", inputs: ["tagline", "expanded", "disabled", "tooltip"] }, { kind: "directive", type: ViewOutletDirective, selector: "[hraViewOutlet]", inputs: ["hraViewOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: FullscreenPortalComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-fullscreen-portal', imports: [HraCommonModule, MatDialogModule, MatIconModule, ButtonsModule, ExpansionPanelModule, ViewOutletDirective], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-template [hraViewOutlet]=\"viewRef()\" />\n\n<ng-template #contentTemplate>\n  <ng-content select=\"hra-fullscreen-portal-content\" />\n</ng-template>\n\n<ng-template #dialogTemplate>\n  <hra-expansion-panel hraFeature=\"fullscreen\" disabled [tagline]=\"tagline()\">\n    <hra-expansion-panel-actions>\n      <ng-content select=\"hra-fullscreen-actions\" />\n    </hra-expansion-panel-actions>\n\n    <hra-expansion-panel-header-content>\n      <button mat-icon-button mat-dialog-close hraFeature=\"close\" hraClickEvent>\n        <mat-icon class=\"material-symbols-rounded\"> close </mat-icon>\n      </button>\n    </hra-expansion-panel-header-content>\n\n    <ng-template data-testid=\"fullscreen-outlet\" [hraViewOutlet]=\"viewRef()\" />\n  </hra-expansion-panel>\n</ng-template>\n", styles: [":host{display:block}::ng-deep .fullscreen-panel{width:100%;height:100%;--mat-dialog-container-max-width: 100%;--mat-dialog-container-color: white;--mat-dialog-container-shape: 0}::ng-deep .fullscreen-panel .header{padding:.75rem 1rem}::ng-deep .fullscreen-panel .content{height:calc(100vh - 5rem)}::ng-deep .fullscreen-panel .content .expansion-body{height:100%;width:100%}::ng-deep .fullscreen-panel hra-expansion-panel-header-content{height:100%;width:100%;text-align:right}\n"] }]
        }], ctorParameters: () => [], propDecorators: { tagline: [{ type: i0.Input, args: [{ isSignal: true, alias: "tagline", required: true }] }], panelClass: [{ type: i0.Input, args: [{ isSignal: true, alias: "panelClass", required: false }] }], beforeOpened: [{ type: i0.Output, args: ["beforeOpened"] }], opened: [{ type: i0.Output, args: ["opened"] }], beforeClosed: [{ type: i0.Output, args: ["beforeClosed"] }], closed: [{ type: i0.Output, args: ["closed"] }], viewOutlet: [{ type: i0.ViewChild, args: [i0.forwardRef(() => ViewOutletDirective), { isSignal: true }] }], contentTemplateRef: [{ type: i0.ViewChild, args: ['contentTemplate', { isSignal: true }] }], dialogTemplateRef: [{ type: i0.ViewChild, args: ['dialogTemplate', { isSignal: true }] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { FullscreenActionsComponent, FullscreenPortalComponent, FullscreenPortalContentComponent, ViewOutletDirective };
//# sourceMappingURL=hra-ui-design-system-fullscreen.mjs.map
