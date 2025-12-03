import * as _angular_core from '@angular/core';
import { MatListOption } from '@angular/material/list';

/** Search list option interface */
interface SearchListOption {
    /** Option id */
    id: string;
    /** Option label */
    label: string;
    /** Secondary label */
    secondaryLabel?: string;
    /** Number of results for the filter option in the data */
    count?: number;
}
/**
 * Keyboard-accessible filter list flyout menu with an optional search text field with autocomplete
 */
declare class SearchListComponent<T extends SearchListOption> {
    /** Whether to hide the autocomplete search bar */
    readonly disableSearch: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** Whether to disable the ripple effect for list items */
    readonly disableRipple: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** All filter options */
    readonly options: _angular_core.InputSignal<T[]>;
    /** Currently selected filter IDs */
    readonly selected: _angular_core.ModelSignal<string[] | undefined>;
    /** Current search bar value */
    readonly search: _angular_core.ModelSignal<string>;
    /** Filtered options (after typing in search bar) */
    readonly filteredOptions: _angular_core.Signal<T[]>;
    /**
     * Updates selected option ids on update
     * @param event Selected options in list
     */
    selectionUpdate(event: MatListOption[]): void;
    /** Filters options according to the search bar value */
    private doSearch;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<SearchListComponent<any>, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<SearchListComponent<any>, "hra-search-list", never, { "disableSearch": { "alias": "disableSearch"; "required": false; "isSignal": true; }; "disableRipple": { "alias": "disableRipple"; "required": false; "isSignal": true; }; "options": { "alias": "options"; "required": true; "isSignal": true; }; "selected": { "alias": "selected"; "required": false; "isSignal": true; }; "search": { "alias": "search"; "required": false; "isSignal": true; }; }, { "selected": "selectedChange"; "search": "searchChange"; }, never, never, true, never>;
}

export { SearchListComponent };
export type { SearchListOption };
