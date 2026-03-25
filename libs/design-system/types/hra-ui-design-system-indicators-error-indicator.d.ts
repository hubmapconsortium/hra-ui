import * as _angular_core from '@angular/core';

/** Error Indicator component */
declare class ErrorIndicatorComponent {
    /** List of errors to be shown in the indicator */
    readonly errors: _angular_core.InputSignal<string[] | undefined>;
    /** Call to action link */
    readonly actionLink: _angular_core.InputSignal<string | undefined>;
    /** Call to action link label */
    readonly actionLinkLabel: _angular_core.InputSignal<string | undefined>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<ErrorIndicatorComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<ErrorIndicatorComponent, "hra-error-indicator", never, { "errors": { "alias": "errors"; "required": false; "isSignal": true; }; "actionLink": { "alias": "actionLink"; "required": false; "isSignal": true; }; "actionLinkLabel": { "alias": "actionLinkLabel"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

export { ErrorIndicatorComponent };
