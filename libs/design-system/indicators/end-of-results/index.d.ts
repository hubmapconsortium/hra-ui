import * as _angular_core from '@angular/core';

/**
 * End of Results Indicator Component
 */
declare class EndOfResultsIndicatorComponent {
    /** Count of filtered results */
    readonly count: _angular_core.InputSignalWithTransform<number, unknown>;
    /** Label text for results count */
    readonly label: _angular_core.InputSignal<string>;
    /** Description text */
    readonly description: _angular_core.InputSignal<string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<EndOfResultsIndicatorComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<EndOfResultsIndicatorComponent, "hra-end-of-results-indicator", never, { "count": { "alias": "count"; "required": true; "isSignal": true; }; "label": { "alias": "label"; "required": false; "isSignal": true; }; "description": { "alias": "description"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

export { EndOfResultsIndicatorComponent };
