import * as i0 from '@angular/core';
import { input, Directive, makeEnvironmentProviders } from '@angular/core';
import { MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS } from '@angular/material/button-toggle';

/** Applies sizing to button toggle groups */
class ButtonToggleSizeDirective {
    /** Size of buttons */
    size = input.required(...(ngDevMode ? [{ debugName: "size", alias: 'hraButtonToggleSize' }] : [{ alias: 'hraButtonToggleSize' }]));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: ButtonToggleSizeDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.3", type: ButtonToggleSizeDirective, isStandalone: true, selector: "mat-button-toggle-group[hraButtonToggleSize]", inputs: { size: { classPropertyName: "size", publicName: "hraButtonToggleSize", isSignal: true, isRequired: true, transformFunction: null } }, host: { properties: { "class": "\"hra-button-toggle-size-\" + size()" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: ButtonToggleSizeDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mat-button-toggle-group[hraButtonToggleSize]',
                    standalone: true,
                    host: {
                        '[class]': '"hra-button-toggle-size-" + size()',
                    },
                }]
        }] });

/**
 * Applies global styles to button toggles
 *
 * @returns Button toggle providers
 */
function provideButtonToggle() {
    return makeEnvironmentProviders([
        {
            provide: MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS,
            useValue: {
                hideMultipleSelectionIndicator: true,
            },
        },
    ]);
}

/**
 * Generated bundle index. Do not edit.
 */

export { ButtonToggleSizeDirective, provideButtonToggle };
//# sourceMappingURL=hra-ui-design-system-buttons-button-toggle.mjs.map
