import * as _angular_core from '@angular/core';

/** Interface for Tooltip Card Content */
interface TooltipContent {
    /** Title of the card */
    title?: string;
    /** Description of the card */
    description: string;
}
/**
 * Tooltip Card component
 */
declare class TooltipCardComponent {
    /** Input for the card */
    readonly content: _angular_core.InputSignal<TooltipContent[]>;
    /** Flag to decide whether the card is small */
    readonly small: _angular_core.InputSignalWithTransform<boolean, unknown>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<TooltipCardComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<TooltipCardComponent, "hra-tooltip-card", never, { "content": { "alias": "content"; "required": true; "isSignal": true; }; "small": { "alias": "small"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

export { TooltipCardComponent };
export type { TooltipContent };
