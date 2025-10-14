import * as _angular_core from '@angular/core';
import { SoftwareStatus } from '@hra-ui/design-system/indicators/software-status-indicator';

/**
 * App Label Component
 */
declare class AppLabelComponent {
    /** Product title */
    readonly tagline: _angular_core.InputSignal<string>;
    /** Product logo */
    readonly logo: _angular_core.InputSignal<string>;
    /** App software status */
    readonly appStatus: _angular_core.InputSignal<SoftwareStatus | undefined>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<AppLabelComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<AppLabelComponent, "hra-app-label", never, { "tagline": { "alias": "tagline"; "required": true; "isSignal": true; }; "logo": { "alias": "logo"; "required": true; "isSignal": true; }; "appStatus": { "alias": "appStatus"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

export { AppLabelComponent };
