import * as _angular_core from '@angular/core';

/** A call to action bar that can be displayed at top of the page */
declare class CtaBarComponent {
    /** Action button text */
    readonly action: _angular_core.InputSignal<string>;
    /** Action description */
    readonly description: _angular_core.InputSignal<string>;
    /** Url to visit when action button is clicked */
    readonly url: _angular_core.InputSignal<string>;
    /** Emits when the close button is clicked */
    readonly closeClick: _angular_core.OutputEmitterRef<void>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<CtaBarComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<CtaBarComponent, "hra-cta-bar", never, { "action": { "alias": "action"; "required": true; "isSignal": true; }; "description": { "alias": "description"; "required": true; "isSignal": true; }; "url": { "alias": "url"; "required": true; "isSignal": true; }; }, { "closeClick": "closeClick"; }, never, never, true, never>;
}

export { CtaBarComponent };
