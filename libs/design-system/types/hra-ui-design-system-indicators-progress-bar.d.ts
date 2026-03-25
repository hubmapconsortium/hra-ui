import * as i0 from '@angular/core';

/** Color options */
type ProgressBarColor = 'dark' | 'color';
/** Style a mat-progress-bar to a specific named color */
declare class ProgressBarColorDirective {
    /** Color of progress bar */
    readonly color: i0.InputSignal<ProgressBarColor>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProgressBarColorDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ProgressBarColorDirective, "mat-progress-bar[hraProgressBarColor]", never, { "color": { "alias": "hraProgressBarColor"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}

export { ProgressBarColorDirective };
export type { ProgressBarColor };
