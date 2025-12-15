import * as _angular_core from '@angular/core';

/**
 * Search Filter Component
 */
declare class SearchFilterComponent {
    /** Label for the form field */
    readonly label: _angular_core.InputSignal<string>;
    /** Current search query as a model */
    readonly search: _angular_core.ModelSignal<string>;
    /** Total number of options */
    readonly totalCount: _angular_core.InputSignalWithTransform<number, unknown>;
    /** Number of currently visible/filtered options */
    readonly viewingCount: _angular_core.InputSignalWithTransform<number, unknown>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<SearchFilterComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<SearchFilterComponent, "hra-search-filter", never, { "label": { "alias": "label"; "required": true; "isSignal": true; }; "search": { "alias": "search"; "required": false; "isSignal": true; }; "totalCount": { "alias": "totalCount"; "required": true; "isSignal": true; }; "viewingCount": { "alias": "viewingCount"; "required": true; "isSignal": true; }; }, { "search": "searchChange"; }, never, never, true, never>;
}

export { SearchFilterComponent };
