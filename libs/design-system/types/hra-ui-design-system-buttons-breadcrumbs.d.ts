import * as i0 from '@angular/core';

/** Breadcrumb item */
interface BreadcrumbItem {
    /** Name of item */
    name: string;
    /** Route to page */
    route?: string;
}
/**
 * Component used to help the user understand their location within websites
 */
declare class BreadcrumbsComponent {
    /** Crumbs to display */
    readonly crumbs: i0.InputSignal<BreadcrumbItem[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BreadcrumbsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BreadcrumbsComponent, "hra-breadcrumbs", never, { "crumbs": { "alias": "crumbs"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

export { BreadcrumbsComponent };
export type { BreadcrumbItem };
