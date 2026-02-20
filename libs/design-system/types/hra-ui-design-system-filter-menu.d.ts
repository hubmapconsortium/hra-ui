import * as _angular_core from '@angular/core';
import { ConnectedPosition } from '@angular/cdk/overlay';
import { SearchListOption } from '@hra-ui/design-system/search-list';

/** Filter option category interface */
interface FilterOptionCategory<T extends SearchListOption> {
    /** Category id */
    id: string;
    /** Category label */
    label: string;
    /** All filter options */
    options: T[];
    /** Selected filter options */
    selected?: T[];
}
/**
 * A collapsing menu with ways to refine databases to particular views, sorting and grouping preferences, and filters
 */
declare class FilterMenuComponent<T extends SearchListOption> {
    /** Menu tagline */
    readonly tagline: _angular_core.InputSignal<string | undefined>;
    /** Menu description */
    readonly description: _angular_core.InputSignal<string | undefined>;
    /** Whether to show the close button */
    readonly enableClose: _angular_core.InputSignal<boolean | undefined>;
    /** List of all filters with options */
    readonly filters: _angular_core.ModelSignal<FilterOptionCategory<T>[]>;
    /** Emits when the form opening state is toggled */
    readonly closeClick: _angular_core.OutputEmitterRef<void>;
    /** Whether the user is on a wide screen */
    protected readonly isWideScreen: _angular_core.Signal<boolean>;
    /** Overlay positions for the filter menu */
    protected readonly filterMenuPositions: ConnectedPosition[];
    /** Current active filter */
    protected readonly activeFilter: _angular_core.WritableSignal<FilterOptionCategory<T> | undefined>;
    /** Current active filter id */
    protected readonly activeFilterId: _angular_core.Signal<string | undefined>;
    /**
     * Updates filters on filter selection
     * @param category Filter category to update
     * @param selected Selected filter options
     */
    updateFilterSelection(category: FilterOptionCategory<T>, selected?: T[]): void;
    /**
     * Closes filter menu
     * @param category Filter category to close
     */
    closeFilterMenu(category?: FilterOptionCategory<T>): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<FilterMenuComponent<any>, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<FilterMenuComponent<any>, "hra-filter-menu", never, { "tagline": { "alias": "tagline"; "required": false; "isSignal": true; }; "description": { "alias": "description"; "required": false; "isSignal": true; }; "enableClose": { "alias": "enableClose"; "required": false; "isSignal": true; }; "filters": { "alias": "filters"; "required": true; "isSignal": true; }; }, { "filters": "filtersChange"; "closeClick": "closeClick"; }, never, ["*"], true, never>;
}

export { FilterMenuComponent };
export type { FilterOptionCategory };
