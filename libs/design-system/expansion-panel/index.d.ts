import * as i0 from '@angular/core';
import { AnimationEvent } from '@angular/animations';

/** Expansion panel actions component */
declare class ExpansionPanelActionsComponent {
    static ɵfac: i0.ɵɵFactoryDeclaration<ExpansionPanelActionsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ExpansionPanelActionsComponent, "hra-expansion-panel-actions", never, {}, {}, never, ["*"], true, never>;
}
/** Expansion panel header content component */
declare class ExpansionPanelHeaderContentComponent {
    static ɵfac: i0.ɵɵFactoryDeclaration<ExpansionPanelHeaderContentComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ExpansionPanelHeaderContentComponent, "hra-expansion-panel-header-content", never, {}, {}, never, ["*"], true, never>;
}
/** Expansion panel component */
declare class ExpansionPanelComponent {
    /** Title of the expansion panel */
    readonly tagline: i0.InputSignal<string>;
    /** Flag to check if the body is expanded */
    readonly expanded: i0.InputSignalWithTransform<boolean, unknown>;
    /** Flag to denote panel as disabled */
    readonly disabled: i0.InputSignalWithTransform<boolean, unknown>;
    /** Tooltip for header title */
    readonly tooltip: i0.InputSignal<string | undefined>;
    /** Increments the counter on every declaration */
    protected readonly id: number;
    /** Id attribute for title based on current id counter */
    protected readonly taglineId: string;
    /** Id attribute for body based on current id counter */
    protected readonly bodyId: string;
    /** Instance of renderer */
    private readonly renderer;
    /** Instance of body element */
    private readonly bodyElementRef;
    /** Actual body element */
    private readonly body;
    /** Disable animations based on module type */
    private readonly animationsDisabled;
    /** Sets attribute based on event state */
    protected animationStart(event: AnimationEvent): void;
    /** Removes attribute based on event state */
    protected animationDone(event: AnimationEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ExpansionPanelComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ExpansionPanelComponent, "hra-expansion-panel", never, { "tagline": { "alias": "tagline"; "required": true; "isSignal": true; }; "expanded": { "alias": "expanded"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "tooltip": { "alias": "tooltip"; "required": false; "isSignal": true; }; }, {}, never, ["hra-expansion-panel-actions", "hra-expansion-panel-header-content", "*"], true, never>;
}

/** Expansion panel module */
declare class ExpansionPanelModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<ExpansionPanelModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ExpansionPanelModule, never, [typeof ExpansionPanelActionsComponent, typeof ExpansionPanelHeaderContentComponent, typeof ExpansionPanelComponent], [typeof ExpansionPanelActionsComponent, typeof ExpansionPanelHeaderContentComponent, typeof ExpansionPanelComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ExpansionPanelModule>;
}

export { ExpansionPanelActionsComponent, ExpansionPanelComponent, ExpansionPanelHeaderContentComponent, ExpansionPanelModule };
