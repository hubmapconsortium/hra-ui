import * as i0 from '@angular/core';
import { InjectionToken, Provider } from '@angular/core';
import * as i1 from '@angular/material/tooltip';
import { MatTooltip } from '@angular/material/tooltip';

/** Type of Tooltip size */
type PlainTooltipSize = 'small' | 'medium';
/** Plain tooltip options */
interface PlainTooltipOptions {
    /** Whether tooltips use the HRA plain tooltip styles. When false, they keep the default Material tooltip styles */
    hraStyles: boolean;
}
/** Injection token for plain tooltip options */
declare const PLAIN_TOOLTIP_OPTIONS: InjectionToken<PlainTooltipOptions>;
/**
 * Provides plain tooltip options
 *
 * @param options Plain tooltip options
 * @returns A provider for the options
 */
declare function providePlainTooltipOptions(options: PlainTooltipOptions): Provider;
/** Directive for Tooltip */
declare class PlainTooltipDirective {
    /** Size of the tooltip */
    readonly size: i0.InputSignal<PlainTooltipSize>;
    /** Instance of MatTooltip */
    protected readonly tooltip: MatTooltip;
    /** Registers the styles and sets class names for the tooltip container, unless the HRA styles are turned off */
    constructor();
    static ɵfac: i0.ɵɵFactoryDeclaration<PlainTooltipDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<PlainTooltipDirective, "[hraPlainTooltip]", never, { "size": { "alias": "hraPlainTooltipSize"; "required": false; "isSignal": true; }; }, {}, never, never, true, [{ directive: typeof i1.MatTooltip; inputs: { "matTooltip": "hraPlainTooltip"; "matTooltipPosition": "hraPlainTooltipPosition"; }; outputs: {}; }]>;
}

export { PLAIN_TOOLTIP_OPTIONS, PlainTooltipDirective, providePlainTooltipOptions };
export type { PlainTooltipOptions, PlainTooltipSize };
