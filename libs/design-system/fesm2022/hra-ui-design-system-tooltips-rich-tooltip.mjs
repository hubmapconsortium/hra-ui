import { Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import * as i0 from '@angular/core';
import { Directive, ChangeDetectionStrategy, Component, viewChild, TemplateRef, contentChildren, input, output, inject, ElementRef, ViewContainerRef, computed, effect, NgModule } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import * as i1 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';

/**
 * Directive to provide tooltip context
 * to the RichTooltip component.
 */
class RichTooltipContextDirective {
    /** Types the context as `RichTooltipDirective` */
    /* istanbul ignore next */
    static ngTemplateContextGuard(_dir, _ctx) {
        return true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: RichTooltipContextDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.3", type: RichTooltipContextDirective, isStandalone: true, selector: "ng-template[hraRichTooltipContext]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: RichTooltipContextDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ng-template[hraRichTooltipContext]',
                }]
        }] });
/**
 * Component for the Rich Tooltip Tagline
 */
class RichTooltipTaglineComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: RichTooltipTaglineComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.3", type: RichTooltipTaglineComponent, isStandalone: true, selector: "hra-rich-tooltip-tagline", ngImport: i0, template: '<ng-content />', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: RichTooltipTaglineComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'hra-rich-tooltip-tagline',
                    template: '<ng-content />',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }] });
/**
 * Component for the Rich Tooltip Content
 */
class RichTooltipContentComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: RichTooltipContentComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.3", type: RichTooltipContentComponent, isStandalone: true, selector: "hra-rich-tooltip-content", ngImport: i0, template: '<ng-content />', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: RichTooltipContentComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'hra-rich-tooltip-content',
                    template: '<ng-content />',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }] });
/**
 * Component for the Rich Tooltip actions row
 */
class RichTooltipActionsComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: RichTooltipActionsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.3", type: RichTooltipActionsComponent, isStandalone: true, selector: "hra-rich-tooltip-actions", ngImport: i0, template: '<ng-content />', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: RichTooltipActionsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'hra-rich-tooltip-actions',
                    template: '<ng-content />',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }] });
/**
 * Directive that can be used on a button
 * for closing the rich tooltip.
 */
class RichTooltipCloseDirective {
    /**
     * The controller for the rich tooltip.
     * (context is set by component once initialized)
     */
    controller = undefined;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: RichTooltipCloseDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.3", type: RichTooltipCloseDirective, isStandalone: true, selector: "[hraRichTooltipClose]", host: { listeners: { "click": "controller?.close()" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: RichTooltipCloseDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[hraRichTooltipClose]',
                    host: {
                        '(click)': 'controller?.close()',
                    },
                }]
        }] });
/**
 * The main component of the Rich Tooltip - the container,
 * encapsulates all the other components (tagline, content & actions).
 */
class RichTooltipContainerComponent {
    /**
     * ViewChild for the container template.
     */
    template = viewChild.required('container', { read: (TemplateRef) });
    /**
     * List of close directives used in the custom template.
     */
    closeDirectives = contentChildren(RichTooltipCloseDirective, ...(ngDevMode ? [{ debugName: "closeDirectives", descendants: true }] : [{ descendants: true }]));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: RichTooltipContainerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.3", type: RichTooltipContainerComponent, isStandalone: true, selector: "hra-rich-tooltip-container", queries: [{ propertyName: "closeDirectives", predicate: RichTooltipCloseDirective, descendants: true, isSignal: true }], viewQueries: [{ propertyName: "template", first: true, predicate: ["container"], descendants: true, read: TemplateRef, isSignal: true }], exportAs: ["hraRichTooltipContainer"], ngImport: i0, template: "<ng-template hraRichTooltipContext let-owner #container>\n  <div class=\"container\">\n    <div class=\"tagline\">\n      <ng-content select=\"hra-rich-tooltip-tagline\">\n        {{ owner.tagline() }}\n      </ng-content>\n    </div>\n    <div class=\"content\">\n      <ng-content select=\"hra-rich-tooltip-content\">\n        {{ owner.description() }}\n      </ng-content>\n    </div>\n    <div class=\"actions\">\n      <ng-content select=\"hra-rich-tooltip-actions\">\n        @if (owner.actionText()) {\n          <button mat-button color=\"accent\" (click)=\"owner.actionClick.emit()\">{{ owner.actionText() }}</button>\n        }\n      </ng-content>\n    </div>\n  </div>\n</ng-template>\n", styles: [":host{display:block}.container{max-width:19.5rem;width:fit-content;background-color:var(--mat-sys-secondary-container);border-radius:.5rem;box-shadow:0 .125rem .25rem .125rem rgb(from var(--mat-sys-shadow) r g b/24%)}.container .tagline{padding:.75rem 1rem .25rem;font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking);color:var(--mat-sys-on-surface)}.container .content{padding:0 1rem .25rem;font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking);color:var(--mat-sys-primary)}.container .actions{padding:0 .5rem .25rem}.container .actions button{font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking)}\n"], dependencies: [{ kind: "directive", type: RichTooltipContextDirective, selector: "ng-template[hraRichTooltipContext]" }, { kind: "ngmodule", type: MatButtonModule }, { kind: "component", type: i1.MatButton, selector: "    button[matButton], a[matButton], button[mat-button], button[mat-raised-button],    button[mat-flat-button], button[mat-stroked-button], a[mat-button], a[mat-raised-button],    a[mat-flat-button], a[mat-stroked-button]  ", inputs: ["matButton"], exportAs: ["matButton", "matAnchor"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: RichTooltipContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-rich-tooltip-container', imports: [RichTooltipContextDirective, MatButtonModule], changeDetection: ChangeDetectionStrategy.OnPush, exportAs: 'hraRichTooltipContainer', template: "<ng-template hraRichTooltipContext let-owner #container>\n  <div class=\"container\">\n    <div class=\"tagline\">\n      <ng-content select=\"hra-rich-tooltip-tagline\">\n        {{ owner.tagline() }}\n      </ng-content>\n    </div>\n    <div class=\"content\">\n      <ng-content select=\"hra-rich-tooltip-content\">\n        {{ owner.description() }}\n      </ng-content>\n    </div>\n    <div class=\"actions\">\n      <ng-content select=\"hra-rich-tooltip-actions\">\n        @if (owner.actionText()) {\n          <button mat-button color=\"accent\" (click)=\"owner.actionClick.emit()\">{{ owner.actionText() }}</button>\n        }\n      </ng-content>\n    </div>\n  </div>\n</ng-template>\n", styles: [":host{display:block}.container{max-width:19.5rem;width:fit-content;background-color:var(--mat-sys-secondary-container);border-radius:.5rem;box-shadow:0 .125rem .25rem .125rem rgb(from var(--mat-sys-shadow) r g b/24%)}.container .tagline{padding:.75rem 1rem .25rem;font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking);color:var(--mat-sys-on-surface)}.container .content{padding:0 1rem .25rem;font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking);color:var(--mat-sys-primary)}.container .actions{padding:0 .5rem .25rem}.container .actions button{font:var(--mat-sys-label-medium);letter-spacing:var(--mat-sys-label-medium-tracking)}\n"] }]
        }] });

/**
 * Viewport margin for the rich tooltip
 */
const VIEWPORT_MARGIN = 8;
/**
 * Default positions array
 */
const POSITIONS = [
    {
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top',
    },
    {
        originX: 'end',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top',
    },
    {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'top',
    },
    {
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom',
    },
    {
        originX: 'end',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'bottom',
    },
    {
        originX: 'start',
        originY: 'top',
        overlayX: 'end',
        overlayY: 'bottom',
    },
];
/**
 * HRA Rich Tooltip Directive
 */
class RichTooltipDirective {
    /**
     * Custom content for the rich tooltip
     * - Not required if need to use simple content variant
     */
    customContainer = input(undefined, ...(ngDevMode ? [{ debugName: "customContainer", alias: 'hraRichTooltip' }] : [{ alias: 'hraRichTooltip' }]));
    /**
     * Title for the rich tooltip
     * - Not required if using custom content variant
     */
    tagline = input('', ...(ngDevMode ? [{ debugName: "tagline", alias: 'hraRichTooltipTagline' }] : [{ alias: 'hraRichTooltipTagline' }]));
    /**
     * Description for the rich tooltip
     * - Not required if using the custom content variant
     */
    description = input('', ...(ngDevMode ? [{ debugName: "description", alias: 'hraRichTooltipDescription' }] : [{ alias: 'hraRichTooltipDescription' }]));
    /**
     * Action Text for the rich tooltip
     * - Not required if using the custom content variant
     */
    actionText = input('', ...(ngDevMode ? [{ debugName: "actionText", alias: 'hraRichTooltipActionText' }] : [{ alias: 'hraRichTooltipActionText' }]));
    /**
     * Positions array for the rich tooltip
     */
    positions = input(POSITIONS, ...(ngDevMode ? [{ debugName: "positions", alias: 'hraRichTooltipPositions' }] : [{ alias: 'hraRichTooltipPositions' }]));
    /**
     * Action Click Output Emitter for the rich tooltip
     * - Not required to be subscribed to if using the custom content variant
     */
    actionClick = output({ alias: 'hraRichTooltipActionClick' });
    /**
     * Element Ref for the rich tooltip
     */
    elementRef = inject(ElementRef);
    /**
     * Container view reference variable DI
     */
    viewContainerRef = inject(ViewContainerRef);
    /**
     * Overlay DI variable
     */
    overlay = inject(Overlay);
    /**
     * Position strategy for the rich tooltip
     */
    positionStrategy = computed(() => {
        return this.overlay
            .position()
            .flexibleConnectedTo(this.elementRef)
            .withFlexibleDimensions(true)
            .withGrowAfterOpen(true)
            .withPositions(this.positions())
            .withViewportMargin(VIEWPORT_MARGIN);
    }, ...(ngDevMode ? [{ debugName: "positionStrategy" }] : []));
    /**
     * Reference variable for the overlay
     */
    overlayRef = this.overlay.create({
        disposeOnNavigation: true,
        hasBackdrop: false,
        positionStrategy: this.positionStrategy(),
        scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });
    /**
     * Boolean flag indicating whether the
     * rich tooltip is currently visible
     */
    isOpen = false;
    /**
     * Container element variable for the rich tooltip
     */
    container;
    /**
     * Constructor for the directive
     */
    constructor() {
        effect((onCleanup) => {
            const customContainer = this.customContainer();
            if (customContainer) {
                this.container = customContainer;
            }
            else {
                const ref = this.viewContainerRef.createComponent(RichTooltipContainerComponent);
                this.container = ref.instance;
                onCleanup(() => ref.destroy());
            }
        });
        effect(() => {
            this.overlayRef.updatePositionStrategy(this.positionStrategy());
        });
        this.overlayRef
            .outsidePointerEvents()
            .pipe(takeUntilDestroyed())
            .subscribe((event) => {
            if (!this.elementRef.nativeElement.contains(event.target)) {
                this.close();
            }
        });
    }
    /**
     * Function to open the rich tooltip.
     */
    open() {
        if (!this.isOpen) {
            this.attach();
            this.isOpen = true;
        }
    }
    /**
     * Function to close the rich tooltip.
     */
    close() {
        if (this.isOpen) {
            this.detach();
            this.isOpen = false;
        }
    }
    /**
     * Function to toggles the rich tooltip.
     */
    toggle() {
        if (this.isOpen) {
            this.close();
        }
        else {
            this.open();
        }
    }
    /**
     * Attaches the rich tooltip component to the overlay.
     */
    attach() {
        const template = this.container.template();
        const portal = new TemplatePortal(template, this.viewContainerRef, { $implicit: this });
        this.container.closeDirectives().forEach((dir) => (dir.controller = this));
        this.overlayRef.attach(portal);
    }
    /**
     * Detaches the rich tooltip component from the overlay.
     */
    detach() {
        this.overlayRef.detach();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: RichTooltipDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.3", type: RichTooltipDirective, isStandalone: true, selector: "[hraRichTooltip]", inputs: { customContainer: { classPropertyName: "customContainer", publicName: "hraRichTooltip", isSignal: true, isRequired: false, transformFunction: null }, tagline: { classPropertyName: "tagline", publicName: "hraRichTooltipTagline", isSignal: true, isRequired: false, transformFunction: null }, description: { classPropertyName: "description", publicName: "hraRichTooltipDescription", isSignal: true, isRequired: false, transformFunction: null }, actionText: { classPropertyName: "actionText", publicName: "hraRichTooltipActionText", isSignal: true, isRequired: false, transformFunction: null }, positions: { classPropertyName: "positions", publicName: "hraRichTooltipPositions", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { actionClick: "hraRichTooltipActionClick" }, host: { listeners: { "click": "toggle()" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: RichTooltipDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[hraRichTooltip]',
                    host: {
                        '(click)': 'toggle()',
                    },
                }]
        }], ctorParameters: () => [] });

class RichTooltipModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: RichTooltipModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.3", ngImport: i0, type: RichTooltipModule, imports: [RichTooltipDirective,
            RichTooltipTaglineComponent,
            RichTooltipContentComponent,
            RichTooltipActionsComponent,
            RichTooltipCloseDirective,
            RichTooltipContainerComponent], exports: [RichTooltipDirective,
            RichTooltipTaglineComponent,
            RichTooltipContentComponent,
            RichTooltipActionsComponent,
            RichTooltipCloseDirective,
            RichTooltipContainerComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: RichTooltipModule, imports: [RichTooltipContainerComponent] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: RichTooltipModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        RichTooltipDirective,
                        RichTooltipTaglineComponent,
                        RichTooltipContentComponent,
                        RichTooltipActionsComponent,
                        RichTooltipCloseDirective,
                        RichTooltipContainerComponent,
                    ],
                    exports: [
                        RichTooltipDirective,
                        RichTooltipTaglineComponent,
                        RichTooltipContentComponent,
                        RichTooltipActionsComponent,
                        RichTooltipCloseDirective,
                        RichTooltipContainerComponent,
                    ],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { RichTooltipActionsComponent, RichTooltipCloseDirective, RichTooltipContainerComponent, RichTooltipContentComponent, RichTooltipDirective, RichTooltipModule, RichTooltipTaglineComponent };
//# sourceMappingURL=hra-ui-design-system-tooltips-rich-tooltip.mjs.map
