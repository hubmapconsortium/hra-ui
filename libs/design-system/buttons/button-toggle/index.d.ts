import * as i0 from '@angular/core';
import { EnvironmentProviders } from '@angular/core';

/** Button toggle size */
type ButtonToggleSize = 'small' | 'medium' | 'large';
/** Applies sizing to button toggle groups */
declare class ButtonToggleSizeDirective {
    /** Size of buttons */
    readonly size: i0.InputSignal<ButtonToggleSize>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonToggleSizeDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ButtonToggleSizeDirective, "mat-button-toggle-group[hraButtonToggleSize]", never, { "size": { "alias": "hraButtonToggleSize"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}

/**
 * Applies global styles to button toggles
 *
 * @returns Button toggle providers
 */
declare function provideButtonToggle(): EnvironmentProviders;

export { ButtonToggleSizeDirective, provideButtonToggle };
export type { ButtonToggleSize };
