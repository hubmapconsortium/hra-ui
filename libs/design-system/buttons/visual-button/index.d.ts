import * as _angular_core from '@angular/core';

/** Type for the visual button */
type VisualButtonVariant = 'bottom' | 'top';
/** Visual Button Component */
declare class VisualButtonComponent {
    /** Label for the button */
    readonly label: _angular_core.InputSignal<string>;
    /** Imgae URL for the button */
    readonly imageUrl: _angular_core.InputSignal<string>;
    /** Variant (top/bottom) for the button */
    readonly variant: _angular_core.InputSignal<VisualButtonVariant>;
    /** disabled property of the button */
    readonly disabled: _angular_core.InputSignalWithTransform<boolean, unknown>;
    /** Output for cardClick */
    readonly cardClick: _angular_core.OutputEmitterRef<void>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<VisualButtonComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<VisualButtonComponent, "hra-visual-button", never, { "label": { "alias": "label"; "required": true; "isSignal": true; }; "imageUrl": { "alias": "imageUrl"; "required": true; "isSignal": true; }; "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; }, { "cardClick": "cardClick"; }, never, never, true, never>;
}

export { VisualButtonComponent };
export type { VisualButtonVariant };
