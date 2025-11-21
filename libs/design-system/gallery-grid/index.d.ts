import * as _angular_core from '@angular/core';
import { TemplateRef } from '@angular/core';
import { CollectionViewer, DataSource, ListRange } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';

/** Gallery grid item context */
interface GalleryGridItemContext<T> {
    /** Item data */
    $implicit: T;
    /** Item index */
    index: number;
}
/** Gallery grid item directive */
declare class GalleryGridItemDirective<T> {
    /** Data source reference */
    readonly hraGalleryGridItemOf: _angular_core.InputSignal<T[] | undefined>;
    /** Template reference */
    readonly templateRef: TemplateRef<any>;
    /** Type guard for template type checking */
    static ngTemplateContextGuard<T>(_dir: GalleryGridItemDirective<T>, ctx: unknown): ctx is GalleryGridItemContext<T>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GalleryGridItemDirective<any>, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<GalleryGridItemDirective<any>, "[hraGalleryGridItem]", never, { "hraGalleryGridItemOf": { "alias": "hraGalleryGridItemOf"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

/** Data source type for gallery grid */
type GridDataSourceType<T> = DataSource<T> | Observable<readonly T[]> | readonly T[];
/** Gallery grid component */
declare class GalleryGridComponent<T> implements CollectionViewer {
    /** Data source for grid items */
    readonly dataSource: _angular_core.InputSignal<GridDataSourceType<T>>;
    /** Template directive for rendering items */
    protected readonly itemTemplate: _angular_core.Signal<GalleryGridItemDirective<any>>;
    /** Observable for view range changes */
    readonly viewChange: Subject<ListRange>;
    /** Current items to display */
    protected readonly items: _angular_core.WritableSignal<readonly T[]>;
    /** Initializes the component */
    constructor();
    /** Type guard for DataSource interface */
    private isDataSource;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GalleryGridComponent<any>, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GalleryGridComponent<any>, "hra-gallery-grid", never, { "dataSource": { "alias": "dataSource"; "required": true; "isSignal": true; }; }, {}, ["itemTemplate"], never, true, never>;
}

export { GalleryGridComponent, GalleryGridItemDirective };
export type { GridDataSourceType };
