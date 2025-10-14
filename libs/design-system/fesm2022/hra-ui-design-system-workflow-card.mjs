import * as i0 from '@angular/core';
import { ChangeDetectionStrategy, Component, input, numberAttribute, NgModule } from '@angular/core';
import * as i1 from '@angular/material/progress-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { StepIndicatorComponent } from '@hra-ui/design-system/indicators/step-indicator';
import { CommonModule } from '@angular/common';

/** Actions placed next to the card title */
class WorkflowCardActionsComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: WorkflowCardActionsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.3", type: WorkflowCardActionsComponent, isStandalone: true, selector: "hra-workflow-card-actions", ngImport: i0, template: '<ng-content></ng-content>', isInline: true, styles: [":host{display:flex;gap:.75rem}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: WorkflowCardActionsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-workflow-card-actions', standalone: true, template: '<ng-content></ng-content>', changeDetection: ChangeDetectionStrategy.OnPush, styles: [":host{display:flex;gap:.75rem}\n"] }]
        }] });
/** Additional content placed on very right side of the header */
class WorkflowCardExtraComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: WorkflowCardExtraComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.3", type: WorkflowCardExtraComponent, isStandalone: true, selector: "hra-workflow-card-extra", ngImport: i0, template: '<ng-content></ng-content>', isInline: true, styles: [":host{display:flex;gap:.75rem}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: WorkflowCardExtraComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-workflow-card-extra', standalone: true, template: '<ng-content></ng-content>', changeDetection: ChangeDetectionStrategy.OnPush, styles: [":host{display:flex;gap:.75rem}\n"] }]
        }] });
/**
 * Component that appears when users are completing a workflow process
 */
class WorkflowCardComponent {
    /** Card title */
    tagline = input.required(...(ngDevMode ? [{ debugName: "tagline" }] : []));
    /** Step indicator value */
    step = input(undefined, ...(ngDevMode ? [{ debugName: "step", transform: numberAttribute }] : [{ transform: numberAttribute }]));
    /** Load progress */
    progress = input(undefined, ...(ngDevMode ? [{ debugName: "progress" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: WorkflowCardComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.3", type: WorkflowCardComponent, isStandalone: true, selector: "hra-workflow-card", inputs: { tagline: { classPropertyName: "tagline", publicName: "tagline", isSignal: true, isRequired: true, transformFunction: null }, step: { classPropertyName: "step", publicName: "step", isSignal: true, isRequired: false, transformFunction: null }, progress: { classPropertyName: "progress", publicName: "progress", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<h2 class=\"header\">\n  @let stepValue = step();\n  @if (stepValue !== undefined) {\n    <hra-step-indicator [value]=\"stepValue\"> </hra-step-indicator>\n  }\n\n  <span class=\"tagline\">{{ tagline() }}</span>\n  <ng-content select=\"hra-workflow-card-actions\"> </ng-content>\n\n  <div class=\"filler\"></div>\n  <ng-content select=\"hra-workflow-card-extra\"> </ng-content>\n</h2>\n\n<div class=\"content\">\n  <ng-content></ng-content>\n</div>\n\n@let progressValue = progress();\n@if (progressValue !== undefined) {\n  <mat-progress-bar class=\"progress\" mode=\"determinate\" [value]=\"100 * progressValue\"> </mat-progress-bar>\n}\n", styles: [":host{display:block;position:relative;height:auto;padding:2rem;border-radius:1rem;overflow:hidden;background-color:var(--mat-sys-surface-container-low);box-shadow:0 .3125rem 1rem rgb(from var(--mat-sys-shadow) r g b/.24)}:host .header{display:flex;gap:.75rem;align-items:center;margin:var(--hra-workflow-card-header-padding, 0 0 2rem 0);font:var(--mat-sys-title-large);letter-spacing:var(--mat-sys-title-large-tracking)}:host .tagline{color:var(--mat-sys-on-background)}:host .progress{position:absolute;inset:auto 0 0;--mat-progress-bar-active-indicator-color: var(--mat-sys-inverse-surface);--mat-progress-bar-active-indicator-height: .25rem;--mat-progress-bar-track-color: var(--mat-sys-surface-container-high);--mat-progress-bar-track-height: .25rem}:host .filler{flex-grow:1}\n"], dependencies: [{ kind: "ngmodule", type: MatProgressBarModule }, { kind: "component", type: i1.MatProgressBar, selector: "mat-progress-bar", inputs: ["color", "value", "bufferValue", "mode"], outputs: ["animationEnd"], exportAs: ["matProgressBar"] }, { kind: "component", type: StepIndicatorComponent, selector: "hra-step-indicator", inputs: ["value"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: WorkflowCardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-workflow-card', imports: [MatProgressBarModule, StepIndicatorComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<h2 class=\"header\">\n  @let stepValue = step();\n  @if (stepValue !== undefined) {\n    <hra-step-indicator [value]=\"stepValue\"> </hra-step-indicator>\n  }\n\n  <span class=\"tagline\">{{ tagline() }}</span>\n  <ng-content select=\"hra-workflow-card-actions\"> </ng-content>\n\n  <div class=\"filler\"></div>\n  <ng-content select=\"hra-workflow-card-extra\"> </ng-content>\n</h2>\n\n<div class=\"content\">\n  <ng-content></ng-content>\n</div>\n\n@let progressValue = progress();\n@if (progressValue !== undefined) {\n  <mat-progress-bar class=\"progress\" mode=\"determinate\" [value]=\"100 * progressValue\"> </mat-progress-bar>\n}\n", styles: [":host{display:block;position:relative;height:auto;padding:2rem;border-radius:1rem;overflow:hidden;background-color:var(--mat-sys-surface-container-low);box-shadow:0 .3125rem 1rem rgb(from var(--mat-sys-shadow) r g b/.24)}:host .header{display:flex;gap:.75rem;align-items:center;margin:var(--hra-workflow-card-header-padding, 0 0 2rem 0);font:var(--mat-sys-title-large);letter-spacing:var(--mat-sys-title-large-tracking)}:host .tagline{color:var(--mat-sys-on-background)}:host .progress{position:absolute;inset:auto 0 0;--mat-progress-bar-active-indicator-color: var(--mat-sys-inverse-surface);--mat-progress-bar-active-indicator-height: .25rem;--mat-progress-bar-track-color: var(--mat-sys-surface-container-high);--mat-progress-bar-track-height: .25rem}:host .filler{flex-grow:1}\n"] }]
        }] });

/**
 * Component that appears when users are completing a workflow process
 * @deprecated Use [WorkflowCardComponent](../workflow-card.component.ts) instead
 */
class DeprecatedWorkflowCardComponent {
    /** Current data load progress */
    loadProgress = input(0, ...(ngDevMode ? [{ debugName: "loadProgress" }] : []));
    /** Whether the card allows uploading of files */
    allowUpload = input(false, ...(ngDevMode ? [{ debugName: "allowUpload" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: DeprecatedWorkflowCardComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.3", type: DeprecatedWorkflowCardComponent, isStandalone: true, selector: "hra-workflow-card", inputs: { loadProgress: { classPropertyName: "loadProgress", publicName: "loadProgress", isSignal: true, isRequired: false, transformFunction: null }, allowUpload: { classPropertyName: "allowUpload", publicName: "allowUpload", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<div class=\"content\" [class.allow-upload]=\"allowUpload()\">\n  <ng-content></ng-content>\n</div>\n@if (allowUpload()) {\n  <mat-progress-bar\n    mode=\"determinate\"\n    [class.ready]=\"loadProgress() === 0\"\n    [class.fully-loaded]=\"loadProgress() === 1\"\n    [value]=\"loadProgress() * 100\"\n  ></mat-progress-bar>\n}\n", styles: [":host{display:block;width:42rem;border-radius:1rem;overflow:hidden;box-shadow:0 .3125rem 1rem rgb(from var(--mat-sys-shadow) r g b/.24);background-color:var(--mat-sys-surface-container-low)}:host .content{display:flex;flex-direction:column;gap:2rem;padding:2rem}:host .content.allow-upload{padding-bottom:1.5rem}:host mat-progress-bar{--mat-progress-bar-track-height: .5rem;--mat-progress-bar-active-indicator-height: .5rem;--mat-progress-bar-active-indicator-color: var(--mat-sys-inverse-surface);--mat-progress-bar-track-color: var(--mat-sys-surface-container-high)}:host mat-progress-bar.ready{--mat-progress-bar-track-color: transparent;--mat-progress-bar-active-indicator-color: transparent}:host mat-progress-bar.fully-loaded{opacity:0;transition-delay:.5s}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: MatProgressBarModule }, { kind: "component", type: i1.MatProgressBar, selector: "mat-progress-bar", inputs: ["color", "value", "bufferValue", "mode"], outputs: ["animationEnd"], exportAs: ["matProgressBar"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: DeprecatedWorkflowCardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-workflow-card', imports: [CommonModule, MatProgressBarModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"content\" [class.allow-upload]=\"allowUpload()\">\n  <ng-content></ng-content>\n</div>\n@if (allowUpload()) {\n  <mat-progress-bar\n    mode=\"determinate\"\n    [class.ready]=\"loadProgress() === 0\"\n    [class.fully-loaded]=\"loadProgress() === 1\"\n    [value]=\"loadProgress() * 100\"\n  ></mat-progress-bar>\n}\n", styles: [":host{display:block;width:42rem;border-radius:1rem;overflow:hidden;box-shadow:0 .3125rem 1rem rgb(from var(--mat-sys-shadow) r g b/.24);background-color:var(--mat-sys-surface-container-low)}:host .content{display:flex;flex-direction:column;gap:2rem;padding:2rem}:host .content.allow-upload{padding-bottom:1.5rem}:host mat-progress-bar{--mat-progress-bar-track-height: .5rem;--mat-progress-bar-active-indicator-height: .5rem;--mat-progress-bar-active-indicator-color: var(--mat-sys-inverse-surface);--mat-progress-bar-track-color: var(--mat-sys-surface-container-high)}:host mat-progress-bar.ready{--mat-progress-bar-track-color: transparent;--mat-progress-bar-active-indicator-color: transparent}:host mat-progress-bar.fully-loaded{opacity:0;transition-delay:.5s}\n"] }]
        }] });

/** All components */
const COMPONENTS = [WorkflowCardComponent, WorkflowCardActionsComponent, WorkflowCardExtraComponent];
/** Main module */
class WorkflowCardModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: WorkflowCardModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.3", ngImport: i0, type: WorkflowCardModule, imports: [WorkflowCardComponent, WorkflowCardActionsComponent, WorkflowCardExtraComponent], exports: [WorkflowCardComponent, WorkflowCardActionsComponent, WorkflowCardExtraComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: WorkflowCardModule, imports: [WorkflowCardComponent] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: WorkflowCardModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: COMPONENTS,
                    exports: COMPONENTS,
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { DeprecatedWorkflowCardComponent, WorkflowCardActionsComponent, WorkflowCardComponent, WorkflowCardExtraComponent, WorkflowCardModule };
//# sourceMappingURL=hra-ui-design-system-workflow-card.mjs.map
