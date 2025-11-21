import * as i0 from '@angular/core';
import { input, inject, TemplateRef, Directive, contentChild, signal, effect, ChangeDetectionStrategy, Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Subject, of, isObservable } from 'rxjs';

/** Gallery grid item directive */
class GalleryGridItemDirective {
    /** Data source reference */
    hraGalleryGridItemOf = input(...(ngDevMode ? [undefined, { debugName: "hraGalleryGridItemOf" }] : []));
    /** Template reference */
    templateRef = inject((TemplateRef));
    /** Type guard for template type checking */
    static ngTemplateContextGuard(_dir, ctx) {
        return true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: GalleryGridItemDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.12", type: GalleryGridItemDirective, isStandalone: true, selector: "[hraGalleryGridItem]", inputs: { hraGalleryGridItemOf: { classPropertyName: "hraGalleryGridItemOf", publicName: "hraGalleryGridItemOf", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: GalleryGridItemDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[hraGalleryGridItem]',
                    standalone: true,
                }]
        }], propDecorators: { hraGalleryGridItemOf: [{ type: i0.Input, args: [{ isSignal: true, alias: "hraGalleryGridItemOf", required: false }] }] } });

/** Gallery grid component */
class GalleryGridComponent {
    /** Data source for grid items */
    dataSource = input.required(...(ngDevMode ? [{ debugName: "dataSource" }] : []));
    /** Template directive for rendering items */
    itemTemplate = contentChild.required(GalleryGridItemDirective, { read: GalleryGridItemDirective });
    /** Observable for view range changes */
    viewChange = new Subject();
    /** Current items to display */
    items = signal([], ...(ngDevMode ? [{ debugName: "items" }] : []));
    /** Initializes the component */
    constructor() {
        effect((onCleanup) => {
            const source = this.dataSource();
            let stream$;
            if (this.isDataSource(source)) {
                stream$ = source.connect(this);
            }
            else {
                stream$ = isObservable(source) ? source : of(source);
            }
            const dataSubscription = stream$.subscribe((data) => this.items.set(data));
            onCleanup(() => {
                dataSubscription?.unsubscribe();
                if (this.isDataSource(source)) {
                    source.disconnect(this);
                }
            });
        });
    }
    /** Type guard for DataSource interface */
    isDataSource(value) {
        return value !== null && typeof value === 'object' && 'connect' in value;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: GalleryGridComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.12", type: GalleryGridComponent, isStandalone: true, selector: "hra-gallery-grid", inputs: { dataSource: { classPropertyName: "dataSource", publicName: "dataSource", isSignal: true, isRequired: true, transformFunction: null } }, queries: [{ propertyName: "itemTemplate", first: true, predicate: GalleryGridItemDirective, descendants: true, read: GalleryGridItemDirective, isSignal: true }], ngImport: i0, template: "@if (itemTemplate()) {\n  @for (item of items(); track $index) {\n    <ng-container *ngTemplateOutlet=\"itemTemplate().templateRef; context: { $implicit: item, index: $index }\" />\n  }\n}\n", styles: [":host{display:grid;grid-template-columns:repeat(auto-fill,minmax(16rem,1fr));gap:1.5rem}\n"], dependencies: [{ kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: GalleryGridComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-gallery-grid', imports: [NgTemplateOutlet], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (itemTemplate()) {\n  @for (item of items(); track $index) {\n    <ng-container *ngTemplateOutlet=\"itemTemplate().templateRef; context: { $implicit: item, index: $index }\" />\n  }\n}\n", styles: [":host{display:grid;grid-template-columns:repeat(auto-fill,minmax(16rem,1fr));gap:1.5rem}\n"] }]
        }], ctorParameters: () => [], propDecorators: { dataSource: [{ type: i0.Input, args: [{ isSignal: true, alias: "dataSource", required: true }] }], itemTemplate: [{ type: i0.ContentChild, args: [i0.forwardRef(() => GalleryGridItemDirective), { ...{ read: GalleryGridItemDirective }, isSignal: true }] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { GalleryGridComponent, GalleryGridItemDirective };
//# sourceMappingURL=hra-ui-design-system-gallery-grid.mjs.map
