import * as i0 from '@angular/core';

/** Actions placed next to the card title */
declare class WorkflowCardActionsComponent {
    static ɵfac: i0.ɵɵFactoryDeclaration<WorkflowCardActionsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WorkflowCardActionsComponent, "hra-workflow-card-actions", never, {}, {}, never, ["*"], true, never>;
}
/** Additional content placed on very right side of the header */
declare class WorkflowCardExtraComponent {
    static ɵfac: i0.ɵɵFactoryDeclaration<WorkflowCardExtraComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WorkflowCardExtraComponent, "hra-workflow-card-extra", never, {}, {}, never, ["*"], true, never>;
}
/**
 * Component that appears when users are completing a workflow process
 */
declare class WorkflowCardComponent {
    /** Card title */
    readonly tagline: i0.InputSignal<string>;
    /** Step indicator value */
    readonly step: i0.InputSignalWithTransform<number | undefined, unknown>;
    /** Load progress */
    readonly progress: i0.InputSignal<number | undefined>;
    static ɵfac: i0.ɵɵFactoryDeclaration<WorkflowCardComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WorkflowCardComponent, "hra-workflow-card", never, { "tagline": { "alias": "tagline"; "required": true; "isSignal": true; }; "step": { "alias": "step"; "required": false; "isSignal": true; }; "progress": { "alias": "progress"; "required": false; "isSignal": true; }; }, {}, never, ["hra-workflow-card-actions", "hra-workflow-card-extra", "*"], true, never>;
}

/**
 * Component that appears when users are completing a workflow process
 * @deprecated Use [WorkflowCardComponent](../workflow-card.component.ts) instead
 */
declare class DeprecatedWorkflowCardComponent {
    /** Current data load progress */
    readonly loadProgress: i0.InputSignal<number>;
    /** Whether the card allows uploading of files */
    readonly allowUpload: i0.InputSignal<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DeprecatedWorkflowCardComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DeprecatedWorkflowCardComponent, "hra-workflow-card", never, { "loadProgress": { "alias": "loadProgress"; "required": false; "isSignal": true; }; "allowUpload": { "alias": "allowUpload"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}

/** Main module */
declare class WorkflowCardModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<WorkflowCardModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<WorkflowCardModule, never, [typeof WorkflowCardComponent, typeof WorkflowCardActionsComponent, typeof WorkflowCardExtraComponent], [typeof WorkflowCardComponent, typeof WorkflowCardActionsComponent, typeof WorkflowCardExtraComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<WorkflowCardModule>;
}

export { DeprecatedWorkflowCardComponent, WorkflowCardActionsComponent, WorkflowCardComponent, WorkflowCardExtraComponent, WorkflowCardModule };
