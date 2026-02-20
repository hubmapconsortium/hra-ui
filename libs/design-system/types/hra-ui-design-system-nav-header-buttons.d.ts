import * as _angular_core from '@angular/core';
import { SoftwareStatus } from '@hra-ui/design-system/indicators/software-status-indicator';

/** Variant of nav header button */
type NavHeaderButtonsVariant = 'basic' | 'sidenav';
/**
 * Logo buttons used in webpage navigation headers, side navigation menus, and application header toolbars.
 */
declare class NavHeaderButtonsComponent {
    /** Variant of logo component */
    readonly variant: _angular_core.InputSignal<NavHeaderButtonsVariant>;
    /** App software status */
    readonly appStatus: _angular_core.InputSignal<SoftwareStatus | undefined>;
    /** Whether to show the HRA brandmark */
    readonly brandmark: _angular_core.InputSignal<boolean>;
    /** Current app */
    readonly app: _angular_core.InputSignal<string>;
    /** Link to app home page */
    readonly appLink: _angular_core.InputSignal<string>;
    /** App title */
    readonly appTitle: _angular_core.InputSignal<string>;
    /** Tooltip displayed when user hovers over the HRA logo */
    readonly hraTooltip: _angular_core.InputSignal<string | undefined>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NavHeaderButtonsComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<NavHeaderButtonsComponent, "hra-nav-header-buttons", never, { "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "appStatus": { "alias": "appStatus"; "required": false; "isSignal": true; }; "brandmark": { "alias": "brandmark"; "required": false; "isSignal": true; }; "app": { "alias": "app"; "required": true; "isSignal": true; }; "appLink": { "alias": "appLink"; "required": true; "isSignal": true; }; "appTitle": { "alias": "appTitle"; "required": true; "isSignal": true; }; "hraTooltip": { "alias": "hraTooltip"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

export { NavHeaderButtonsComponent };
export type { NavHeaderButtonsVariant };
