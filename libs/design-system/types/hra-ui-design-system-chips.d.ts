import * as i0 from '@angular/core';
import * as i1 from '@angular/material/chips';

/** Named chip sizes */
type ChipSize = 'small' | 'medium' | 'large';
/** Style a chip to a specific named size */
declare class ChipSizeDirective {
    /** Size of chip */
    readonly size: i0.InputSignal<ChipSize>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ChipSizeDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ChipSizeDirective, "mat-chip[hraChipSize], mat-chip-option[hraChipSize], mat-chip-row[hraChipSize]", never, { "size": { "alias": "hraChipSize"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}

declare class ChipsModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<ChipsModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ChipsModule, never, [typeof i1.MatChipsModule, typeof ChipSizeDirective], [typeof i1.MatChipsModule, typeof ChipSizeDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ChipsModule>;
}

export { ChipSizeDirective, ChipsModule };
export type { ChipSize };
