import * as _angular_core from '@angular/core';

/** Error Indicator component */
declare class ErrorIndicatorComponent {
    /** List of errors to be shown in the indicator */
    readonly errors: _angular_core.InputSignal<string[] | undefined>;
    /** Material icon shown before the errors, such as `warning` for problems that aren't critical */
    readonly icon: _angular_core.InputSignal<string>;
    /**
     * Whether screen readers announce the errors as soon as they appear. Use it for errors shown after an action,
     * such as a failed upload, but not for messages shown on page load.
     */
    readonly announce: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** Call to action link */
    readonly actionLink: _angular_core.InputSignal<string | undefined>;
    /** Call to action link label */
    readonly actionLinkLabel: _angular_core.InputSignal<string | undefined>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<ErrorIndicatorComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<ErrorIndicatorComponent, "hra-error-indicator", never, { "errors": { "alias": "errors"; "required": false; "isSignal": true; }; "icon": { "alias": "icon"; "required": false; "isSignal": true; }; "announce": { "alias": "announce"; "required": false; "isSignal": true; }; "actionLink": { "alias": "actionLink"; "required": false; "isSignal": true; }; "actionLinkLabel": { "alias": "actionLinkLabel"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

export { ErrorIndicatorComponent };
