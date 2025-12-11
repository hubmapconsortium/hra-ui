import * as i0 from '@angular/core';
import { input, Directive, NgModule } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

/** Style a chip to a specific named size */
class ChipSizeDirective {
    /** Size of chip */
    size = input.required(...(ngDevMode ? [{ debugName: "size", alias: 'hraChipSize' }] : [{ alias: 'hraChipSize' }]));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ChipSizeDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.15", type: ChipSizeDirective, isStandalone: true, selector: "mat-chip[hraChipSize], mat-chip-option[hraChipSize], mat-chip-row[hraChipSize]", inputs: { size: { classPropertyName: "size", publicName: "hraChipSize", isSignal: true, isRequired: true, transformFunction: null } }, host: { properties: { "class": "\"hra-chip-\" + size()" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ChipSizeDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'mat-chip[hraChipSize], mat-chip-option[hraChipSize], mat-chip-row[hraChipSize]',
                    host: {
                        '[class]': '"hra-chip-" + size()',
                    },
                }]
        }], propDecorators: { size: [{ type: i0.Input, args: [{ isSignal: true, alias: "hraChipSize", required: true }] }] } });

class ChipsModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ChipsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.15", ngImport: i0, type: ChipsModule, imports: [MatChipsModule, ChipSizeDirective], exports: [MatChipsModule, ChipSizeDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ChipsModule, imports: [MatChipsModule, MatChipsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ChipsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [MatChipsModule, ChipSizeDirective],
                    exports: [MatChipsModule, ChipSizeDirective],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { ChipSizeDirective, ChipsModule };
//# sourceMappingURL=hra-ui-design-system-chips.mjs.map
