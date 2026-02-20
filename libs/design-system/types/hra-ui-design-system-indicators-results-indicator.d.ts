import * as _angular_core from '@angular/core';

/** Results Indicator Component */
declare class ResultsIndicatorComponent {
    /** Input for value */
    readonly value: _angular_core.InputSignalWithTransform<number, unknown>;
    /** Input for total */
    readonly total: _angular_core.InputSignalWithTransform<number, unknown>;
    /** Input for description */
    readonly description: _angular_core.InputSignal<string>;
    /** Input for separator */
    readonly separator: _angular_core.InputSignal<string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<ResultsIndicatorComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<ResultsIndicatorComponent, "hra-results-indicator", never, { "value": { "alias": "value"; "required": true; "isSignal": true; }; "total": { "alias": "total"; "required": true; "isSignal": true; }; "description": { "alias": "description"; "required": false; "isSignal": true; }; "separator": { "alias": "separator"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

export { ResultsIndicatorComponent };
