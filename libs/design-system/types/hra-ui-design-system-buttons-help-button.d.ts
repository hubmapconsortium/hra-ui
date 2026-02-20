import * as i0 from '@angular/core';
import { MatMenuPanel } from '@angular/material/menu';

/**
 * Help button component that renders either a link or menu trigger
 */
declare class HelpButtonComponent {
    /** Action for the button - URL string for link or MatMenuPanel for menu */
    readonly action: i0.InputSignal<string | MatMenuPanel<any>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<HelpButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<HelpButtonComponent, "hra-help-button", never, { "action": { "alias": "action"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}

export { HelpButtonComponent };
