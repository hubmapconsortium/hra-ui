import * as i0 from '@angular/core';
import * as i1 from '@angular/material/tooltip';
import { MatTooltip } from '@angular/material/tooltip';

/** Type of Tooltip size */
type PlainTooltipSize = 'small' | 'medium';
/** Directive for Tooltip */
declare class PlainTooltipDirective {
    /** Size of the tooltip */
    readonly size: i0.InputSignal<PlainTooltipSize>;
    /** Instance of MatTooltip */
    protected readonly tooltip: MatTooltip;
    /** Registers the styles and sets class names for the tooltip container */
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<PlainTooltipDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<PlainTooltipDirective, "[hraPlainTooltip]", never, { "size": { "alias": "hraPlainTooltipSize"; "required": false; "isSignal": true; }; }, {}, never, never, true, [{ directive: typeof i1.MatTooltip; inputs: { "matTooltip": "hraPlainTooltip"; "matTooltipPosition": "hraPlainTooltipPosition"; }; outputs: {}; }]>;
}

export { PlainTooltipDirective };
export type { PlainTooltipSize };
