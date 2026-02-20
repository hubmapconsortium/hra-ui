import * as _angular_core from '@angular/core';

/** Apps Card Component */
declare class AppNavButtonComponent {
    /** URL for the icon */
    readonly icon: _angular_core.InputSignal<string>;
    /** Title of the card */
    readonly tagline: _angular_core.InputSignal<string>;
    /** Description of the card */
    readonly description: _angular_core.InputSignal<string>;
    /** Link of the card */
    readonly link: _angular_core.InputSignal<string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<AppNavButtonComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<AppNavButtonComponent, "hra-app-nav-button", never, { "icon": { "alias": "icon"; "required": true; "isSignal": true; }; "tagline": { "alias": "tagline"; "required": true; "isSignal": true; }; "description": { "alias": "description"; "required": true; "isSignal": true; }; "link": { "alias": "link"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}

export { AppNavButtonComponent };
