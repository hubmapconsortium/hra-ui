import * as _angular_core from '@angular/core';

/** Alignment options */
type SpinnerSize = 'small' | 'large';
/** Color options */
type SpinnerColor = 'dark' | 'light' | 'color';
/**
 * HRA Progress Spinner Component
 */
declare class ProgressSpinnerComponent {
    /**
     * Field for variant option
     */
    readonly size: _angular_core.InputSignal<SpinnerSize>;
    /**
     * Field for color option
     */
    readonly color: _angular_core.InputSignal<SpinnerColor>;
    /**
     * Computed field for the diameter of the spinner.
     */
    readonly diameter: _angular_core.Signal<24 | 48>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<ProgressSpinnerComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<ProgressSpinnerComponent, "hra-progress-spinner", never, { "size": { "alias": "size"; "required": false; "isSignal": true; }; "color": { "alias": "color"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}

export { ProgressSpinnerComponent };
export type { SpinnerColor, SpinnerSize };
