import * as _angular_core from '@angular/core';

/**
 * Interface for list view items
 */
interface ListViewItem {
    /** Markdown content to display */
    content: string;
}
/**
 * Interface for grouped list view data
 */
interface ListViewGroup {
    /** Group identifier/label */
    group: string;
    /** Items in this group */
    items: ListViewItem[];
}
/**
 * List view component for displaying markdown content in groups
 */
declare class ListViewComponent {
    /** Pre-grouped data to display */
    readonly data: _angular_core.InputSignal<ListViewGroup[]>;
    /** Whether to show groupBy headers */
    readonly groupBy: _angular_core.InputSignal<boolean>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<ListViewComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<ListViewComponent, "hra-list-view", never, { "data": { "alias": "data"; "required": false; "isSignal": true; }; "groupBy": { "alias": "groupBy"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

export { ListViewComponent };
export type { ListViewGroup, ListViewItem };
