import * as _angular_core from '@angular/core';

/** Software status options */
type SoftwareStatus = 'Preview' | 'Alpha' | 'Beta';
/** Software status size options */
type SoftwareStatusSize = 'small' | 'medium' | 'large';
/**
 * Indicator to display software status in nav header
 */
declare class SoftwareStatusIndicatorComponent {
    /** Current status of app */
    readonly status: _angular_core.InputSignal<SoftwareStatus>;
    /** Size of indicator */
    readonly size: _angular_core.InputSignal<SoftwareStatusSize>;
    /** Tooltips corresponding to software status */
    readonly tooltips: Record<SoftwareStatus, string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<SoftwareStatusIndicatorComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<SoftwareStatusIndicatorComponent, "hra-software-status-indicator", never, { "status": { "alias": "status"; "required": true; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

export { SoftwareStatusIndicatorComponent };
export type { SoftwareStatus, SoftwareStatusSize };
