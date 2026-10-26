import * as i0 from '@angular/core';

/** Info Button Tagline Directive */
declare class InfoButtonTaglineDirective {
    static ɵfac: i0.ɵɵFactoryDeclaration<InfoButtonTaglineDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<InfoButtonTaglineDirective, "[hraInfoButtonTagline]", never, {}, {}, never, never, true, never>;
}
/** Info Button Actions Directive */
declare class InfoButtonActionsDirective {
    static ɵfac: i0.ɵɵFactoryDeclaration<InfoButtonActionsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<InfoButtonActionsDirective, "[hraInfoButtonActions]", never, {}, {}, never, never, true, never>;
}
/** Info Button Component */
declare class InfoButtonComponent {
    /** Accessible name of the button, such as "More information about Upload data" */
    readonly label: i0.InputSignal<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<InfoButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<InfoButtonComponent, "hra-info-button", never, { "label": { "alias": "label"; "required": false; "isSignal": true; }; }, {}, never, ["[hraInfoButtonTagline]", "*", "[hraInfoButtonActions]"], true, never>;
}

export { InfoButtonActionsDirective, InfoButtonComponent, InfoButtonTaglineDirective };
