import * as _angular_core from '@angular/core';

/**
 * Component representing a count card.
 * Displays a count, a label, and an icon.
 */
declare class CountCardComponent {
    /** Count */
    readonly count: _angular_core.InputSignal<number>;
    /** Show suffix for the count */
    readonly suffix: _angular_core.InputSignal<string | undefined>;
    /** Label text*/
    readonly label: _angular_core.InputSignal<string>;
    /** Icon */
    readonly icon: _angular_core.InputSignal<string>;
    /** Number currently displayed in count */
    protected readonly currentCount: _angular_core.WritableSignal<number>;
    /**
     * Constructor that initializes the count card component.
     * Starts the count up animation.
     */
    constructor();
    /**
     *  Starts the count up animation.
     *  @param target The target count to reach.
     *  @param numSteps The number of steps in the animation.
     */
    private startCountUp;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<CountCardComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<CountCardComponent, "hra-count-card", never, { "count": { "alias": "count"; "required": true; "isSignal": true; }; "suffix": { "alias": "suffix"; "required": false; "isSignal": true; }; "label": { "alias": "label"; "required": true; "isSignal": true; }; "icon": { "alias": "icon"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}

export { CountCardComponent };
