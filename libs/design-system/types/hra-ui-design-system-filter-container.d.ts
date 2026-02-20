import * as _angular_core from '@angular/core';

/** A filter chip representing a selected filter option */
interface FilterChip {
    /** Label for the chip */
    label: string;
}
/**
 * Design system filter container component
 */
declare class FilterContainerComponent<T extends FilterChip> {
    /** tagline for the filter category */
    readonly action: _angular_core.InputSignal<string>;
    /** Whether to show the info button with tooltip */
    readonly showTooltip: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** Array of selected filter chips - two-way bindable */
    readonly chips: _angular_core.ModelSignal<T[]>;
    /** Whether to show a divider below the container */
    readonly enableDivider: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** Emits when the category button is clicked */
    readonly actionClick: _angular_core.OutputEmitterRef<void>;
    /**
     * Handles the removal of a chip
     * @param chip The chip to remove
     */
    removeChip(chip: T): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<FilterContainerComponent<any>, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<FilterContainerComponent<any>, "hra-filter-container", never, { "action": { "alias": "action"; "required": true; "isSignal": true; }; "showTooltip": { "alias": "showTooltip"; "required": false; "isSignal": true; }; "chips": { "alias": "chips"; "required": false; "isSignal": true; }; "enableDivider": { "alias": "enableDivider"; "required": false; "isSignal": true; }; }, { "chips": "chipsChange"; "actionClick": "actionClick"; }, never, ["[tooltipContent]", "[tooltipActions]"], true, never>;
}

export { FilterContainerComponent };
export type { FilterChip };
