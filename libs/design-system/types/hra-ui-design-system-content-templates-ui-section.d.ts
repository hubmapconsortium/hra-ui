import * as _angular_core from '@angular/core';
import { SoftwareStatus } from '@hra-ui/design-system/indicators/software-status-indicator';

/** UI Section component for displaying app information and status */
declare class UiSectionComponent {
    /** Product title */
    readonly tagline: _angular_core.InputSignal<string>;
    /** Product description */
    readonly description: _angular_core.InputSignal<string>;
    /** Product image path */
    readonly imagePath: _angular_core.InputSignal<string>;
    /** Product logo */
    readonly logo: _angular_core.InputSignal<string>;
    /** App software status */
    readonly appStatus: _angular_core.InputSignal<SoftwareStatus | undefined>;
    /** App URL */
    readonly appUrl: _angular_core.InputSignal<string | undefined>;
    /** Open the app url */
    readonly openAppUrl: _angular_core.OutputEmitterRef<void>;
    /** Documentation URL */
    readonly documentationUrl: _angular_core.InputSignal<string | undefined>;
    /** Open the documentation link */
    readonly openDocumentationLink: _angular_core.OutputEmitterRef<void>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<UiSectionComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<UiSectionComponent, "hra-ui-section", never, { "tagline": { "alias": "tagline"; "required": true; "isSignal": true; }; "description": { "alias": "description"; "required": true; "isSignal": true; }; "imagePath": { "alias": "imagePath"; "required": true; "isSignal": true; }; "logo": { "alias": "logo"; "required": true; "isSignal": true; }; "appStatus": { "alias": "appStatus"; "required": false; "isSignal": true; }; "appUrl": { "alias": "appUrl"; "required": false; "isSignal": true; }; "documentationUrl": { "alias": "documentationUrl"; "required": false; "isSignal": true; }; }, { "openAppUrl": "openAppUrl"; "openDocumentationLink": "openDocumentationLink"; }, never, never, true, never>;
}

export { UiSectionComponent };
