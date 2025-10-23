import * as i2 from '@angular/cdk/accordion';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import * as i0 from '@angular/core';
import { ChangeDetectionStrategy, Component, input, booleanAttribute, inject, Renderer2, viewChild, computed, ANIMATION_MODULE_TYPE, NgModule } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import * as i3 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { trigger, state, transition, style, animate } from '@angular/animations';
import * as i1 from '@hra-ui/common/analytics';

/** Animation for the expansion panel */
const EXPANSION_PANEL_ANIMATION_TIMING = '225ms cubic-bezier(0.4,0.0,0.2,1)';
/** Animation for Body Expansion */
const BODY_EXPANSION = trigger('bodyExpansion', [
    state('collapsed, void', style({ height: '0px', visibility: 'hidden', opacity: 0 })),
    state('expanded', style({ height: '*', visibility: '', opacity: 1 })),
    transition('expanded <=> collapsed, void => collapsed', animate(EXPANSION_PANEL_ANIMATION_TIMING)),
]);

/** Counter to keep track of distinct panels */
let idCounter = 0;
/** Expansion panel actions component */
class ExpansionPanelActionsComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: ExpansionPanelActionsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.7", type: ExpansionPanelActionsComponent, isStandalone: true, selector: "hra-expansion-panel-actions", ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: ExpansionPanelActionsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'hra-expansion-panel-actions',
                    standalone: true,
                    template: '<ng-content></ng-content>',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }] });
/** Expansion panel header content component */
class ExpansionPanelHeaderContentComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: ExpansionPanelHeaderContentComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.7", type: ExpansionPanelHeaderContentComponent, isStandalone: true, selector: "hra-expansion-panel-header-content", ngImport: i0, template: '<ng-content></ng-content>', isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: ExpansionPanelHeaderContentComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'hra-expansion-panel-header-content',
                    standalone: true,
                    template: '<ng-content></ng-content>',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }] });
/** Expansion panel component */
class ExpansionPanelComponent {
    /** Title of the expansion panel */
    tagline = input.required(...(ngDevMode ? [{ debugName: "tagline" }] : []));
    /** Flag to check if the body is expanded */
    expanded = input(true, ...(ngDevMode ? [{ debugName: "expanded", transform: booleanAttribute }] : [{ transform: booleanAttribute }]));
    /** Flag to denote panel as disabled */
    disabled = input(false, ...(ngDevMode ? [{ debugName: "disabled", transform: booleanAttribute }] : [{ transform: booleanAttribute }]));
    /** Tooltip for header title */
    tooltip = input(...(ngDevMode ? [undefined, { debugName: "tooltip" }] : []));
    /** Increments the counter on every declaration */
    id = idCounter++;
    /** Id attribute for title based on current id counter */
    taglineId = `expansion-panel-tagline-${this.id}`;
    /** Id attribute for body based on current id counter */
    bodyId = `expansion-panel-body-${this.id}`;
    /** Instance of renderer */
    renderer = inject(Renderer2);
    /** Instance of body element */
    bodyElementRef = viewChild.required('body');
    /** Actual body element */
    body = computed(() => this.bodyElementRef().nativeElement, ...(ngDevMode ? [{ debugName: "body" }] : []));
    /** Disable animations based on module type */
    animationsDisabled = inject(ANIMATION_MODULE_TYPE) === 'NoopAnimations';
    /** Sets attribute based on event state */
    animationStart(event) {
        if (event.fromState !== 'void' && !this.animationsDisabled) {
            this.renderer.setAttribute(this.body(), 'inert', '');
        }
    }
    /** Removes attribute based on event state */
    animationDone(event) {
        if (event.fromState !== 'void' && !this.animationsDisabled) {
            this.renderer.removeAttribute(this.body(), 'inert');
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: ExpansionPanelComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.7", type: ExpansionPanelComponent, isStandalone: true, selector: "hra-expansion-panel", inputs: { tagline: { classPropertyName: "tagline", publicName: "tagline", isSignal: true, isRequired: true, transformFunction: null }, expanded: { classPropertyName: "expanded", publicName: "expanded", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null }, tooltip: { classPropertyName: "tooltip", publicName: "tooltip", isSignal: true, isRequired: false, transformFunction: null } }, viewQueries: [{ propertyName: "bodyElementRef", first: true, predicate: ["body"], descendants: true, isSignal: true }], ngImport: i0, template: "<cdk-accordion hraFeature=\"expansion-panel\">\n  <cdk-accordion-item\n    #accordionItem=\"cdkAccordionItem\"\n    tabindex=\"0\"\n    [attr.aria-expanded]=\"accordionItem.expanded\"\n    [attr.aria-controls]=\"bodyId\"\n    [expanded]=\"expanded()\"\n  >\n    <div class=\"header\">\n      @if (!disabled()) {\n        <button\n          mat-icon-button\n          [hraClickEvent]=\"{ expanded: accordionItem.expanded }\"\n          data-testid=\"toggle\"\n          (click)=\"accordionItem.toggle()\"\n        >\n          <mat-icon [hraPlainTooltip]=\"accordionItem.expanded ? 'Collapse' : 'Expand'\">\n            {{ accordionItem.expanded ? 'remove' : 'add' }}\n          </mat-icon>\n        </button>\n      }\n\n      <span class=\"title\" [attr.id]=\"taglineId\" [hraPlainTooltip]=\"tooltip()\">\n        {{ tagline() }}\n      </span>\n\n      <span>\n        <ng-content select=\"hra-expansion-panel-actions\"> </ng-content>\n      </span>\n      <div class=\"filler\"></div>\n      <span class=\"header-content\">\n        <ng-content select=\"hra-expansion-panel-header-content\"></ng-content>\n      </span>\n    </div>\n    <div\n      role=\"region\"\n      class=\"content\"\n      [attr.id]=\"bodyId\"\n      [attr.aria-labelledby]=\"taglineId\"\n      #body\n      [@bodyExpansion]=\"accordionItem.expanded ? 'expanded' : 'collapsed'\"\n      (@bodyExpansion.start)=\"animationStart($event)\"\n      (@bodyExpansion.done)=\"animationDone($event)\"\n      data-testid=\"body\"\n    >\n      <div class=\"expansion-body\">\n        <ng-content></ng-content>\n      </div>\n    </div>\n  </cdk-accordion-item>\n</cdk-accordion>\n", styles: [":host{display:block}:host .header{display:flex;align-items:center;font:var(--mat-sys-label-medium);color:var(--mat-sys-secondary)}:host .filler{flex-grow:1}:host .header-content{display:flex;justify-content:flex-end;flex-grow:1}:host .content{font:var(--mat-sys-label-medium);display:flex;flex-direction:column}::ng-deep :host .content[style*=\"visibility: hidden\"] *{visibility:hidden!important}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "ngmodule", type: CdkAccordionModule }, { kind: "directive", type: i2.CdkAccordion, selector: "cdk-accordion, [cdkAccordion]", inputs: ["multi"], exportAs: ["cdkAccordion"] }, { kind: "directive", type: i2.CdkAccordionItem, selector: "cdk-accordion-item, [cdkAccordionItem]", inputs: ["expanded", "disabled"], outputs: ["closed", "opened", "destroyed", "expandedChange"], exportAs: ["cdkAccordionItem"] }, { kind: "component", type: MatIconButton, selector: "button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]", exportAs: ["matButton", "matAnchor"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i3.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "directive", type: PlainTooltipDirective, selector: "[hraPlainTooltip]", inputs: ["hraPlainTooltipSize"] }], animations: [BODY_EXPANSION], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: ExpansionPanelComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-expansion-panel', imports: [HraCommonModule, CdkAccordionModule, MatIconButton, MatIconModule, PlainTooltipDirective], animations: [BODY_EXPANSION], changeDetection: ChangeDetectionStrategy.OnPush, template: "<cdk-accordion hraFeature=\"expansion-panel\">\n  <cdk-accordion-item\n    #accordionItem=\"cdkAccordionItem\"\n    tabindex=\"0\"\n    [attr.aria-expanded]=\"accordionItem.expanded\"\n    [attr.aria-controls]=\"bodyId\"\n    [expanded]=\"expanded()\"\n  >\n    <div class=\"header\">\n      @if (!disabled()) {\n        <button\n          mat-icon-button\n          [hraClickEvent]=\"{ expanded: accordionItem.expanded }\"\n          data-testid=\"toggle\"\n          (click)=\"accordionItem.toggle()\"\n        >\n          <mat-icon [hraPlainTooltip]=\"accordionItem.expanded ? 'Collapse' : 'Expand'\">\n            {{ accordionItem.expanded ? 'remove' : 'add' }}\n          </mat-icon>\n        </button>\n      }\n\n      <span class=\"title\" [attr.id]=\"taglineId\" [hraPlainTooltip]=\"tooltip()\">\n        {{ tagline() }}\n      </span>\n\n      <span>\n        <ng-content select=\"hra-expansion-panel-actions\"> </ng-content>\n      </span>\n      <div class=\"filler\"></div>\n      <span class=\"header-content\">\n        <ng-content select=\"hra-expansion-panel-header-content\"></ng-content>\n      </span>\n    </div>\n    <div\n      role=\"region\"\n      class=\"content\"\n      [attr.id]=\"bodyId\"\n      [attr.aria-labelledby]=\"taglineId\"\n      #body\n      [@bodyExpansion]=\"accordionItem.expanded ? 'expanded' : 'collapsed'\"\n      (@bodyExpansion.start)=\"animationStart($event)\"\n      (@bodyExpansion.done)=\"animationDone($event)\"\n      data-testid=\"body\"\n    >\n      <div class=\"expansion-body\">\n        <ng-content></ng-content>\n      </div>\n    </div>\n  </cdk-accordion-item>\n</cdk-accordion>\n", styles: [":host{display:block}:host .header{display:flex;align-items:center;font:var(--mat-sys-label-medium);color:var(--mat-sys-secondary)}:host .filler{flex-grow:1}:host .header-content{display:flex;justify-content:flex-end;flex-grow:1}:host .content{font:var(--mat-sys-label-medium);display:flex;flex-direction:column}::ng-deep :host .content[style*=\"visibility: hidden\"] *{visibility:hidden!important}\n"] }]
        }], propDecorators: { tagline: [{ type: i0.Input, args: [{ isSignal: true, alias: "tagline", required: true }] }], expanded: [{ type: i0.Input, args: [{ isSignal: true, alias: "expanded", required: false }] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }], tooltip: [{ type: i0.Input, args: [{ isSignal: true, alias: "tooltip", required: false }] }], bodyElementRef: [{ type: i0.ViewChild, args: ['body', { isSignal: true }] }] } });

/** Expansion panel module */
class ExpansionPanelModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: ExpansionPanelModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.7", ngImport: i0, type: ExpansionPanelModule, imports: [ExpansionPanelActionsComponent, ExpansionPanelHeaderContentComponent, ExpansionPanelComponent], exports: [ExpansionPanelActionsComponent, ExpansionPanelHeaderContentComponent, ExpansionPanelComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: ExpansionPanelModule, imports: [ExpansionPanelComponent] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.7", ngImport: i0, type: ExpansionPanelModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ExpansionPanelActionsComponent, ExpansionPanelHeaderContentComponent, ExpansionPanelComponent],
                    exports: [ExpansionPanelActionsComponent, ExpansionPanelHeaderContentComponent, ExpansionPanelComponent],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { ExpansionPanelActionsComponent, ExpansionPanelComponent, ExpansionPanelHeaderContentComponent, ExpansionPanelModule };
//# sourceMappingURL=hra-ui-design-system-expansion-panel.mjs.map
