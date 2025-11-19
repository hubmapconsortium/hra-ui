import * as i0 from '@angular/core';
import { input, booleanAttribute, model, output, ChangeDetectionStrategy, Component } from '@angular/core';
import * as i2 from '@angular/material/chips';
import { MatChipsModule } from '@angular/material/chips';
import * as i3 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i6 from '@angular/material/divider';
import { MatDividerModule } from '@angular/material/divider';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import * as i4 from '@hra-ui/design-system/buttons/info-button';
import { InfoButtonComponent, InfoButtonTaglineDirective, InfoButtonActionsDirective } from '@hra-ui/design-system/buttons/info-button';
import * as i1 from '@angular/material/button';
import * as i5 from '@hra-ui/design-system/buttons/button';

/**
 * Design system filter container component
 */
class FilterContainerComponent {
    /** tagline for the filter category */
    action = input.required(...(ngDevMode ? [{ debugName: "action" }] : []));
    /** Whether to show the info button with tooltip */
    showTooltip = input(false, ...(ngDevMode ? [{ debugName: "showTooltip", transform: booleanAttribute }] : [{ transform: booleanAttribute }]));
    /** Array of selected filter chips - two-way bindable */
    chips = model([], ...(ngDevMode ? [{ debugName: "chips" }] : []));
    /** Whether to show a divider below the container */
    enableDivider = input(false, ...(ngDevMode ? [{ debugName: "enableDivider", transform: booleanAttribute }] : [{ transform: booleanAttribute }]));
    /** Emits when the category button is clicked */
    actionClick = output();
    /**
     * Handles the removal of a chip
     * @param chip The chip to remove
     */
    removeChip(chip) {
        this.chips.update((current) => current.filter((c) => c.label !== chip.label));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: FilterContainerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.12", type: FilterContainerComponent, isStandalone: true, selector: "hra-filter-container", inputs: { action: { classPropertyName: "action", publicName: "action", isSignal: true, isRequired: true, transformFunction: null }, showTooltip: { classPropertyName: "showTooltip", publicName: "showTooltip", isSignal: true, isRequired: false, transformFunction: null }, chips: { classPropertyName: "chips", publicName: "chips", isSignal: true, isRequired: false, transformFunction: null }, enableDivider: { classPropertyName: "enableDivider", publicName: "enableDivider", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { chips: "chipsChange", actionClick: "actionClick" }, ngImport: i0, template: "<div class=\"filter-container\">\n  <div class=\"top-row\">\n    @if (showTooltip()) {\n      <hra-info-button>\n        <span hraInfoButtonTagline>{{ action() }}</span>\n        <ng-content select=\"[tooltipContent]\" />\n        <div hraInfoButtonActions>\n          <ng-content select=\"[tooltipActions]\" />\n        </div>\n      </hra-info-button>\n    }\n    <button\n      mat-button\n      hraButtonVariant=\"secondary\"\n      class=\"category-button\"\n      color=\"primary\"\n      (click)=\"actionClick.emit()\"\n    >\n      {{ action() }}\n    </button>\n  </div>\n\n  @if (chips().length > 0) {\n    <mat-chip-set class=\"chips-container\">\n      @for (chip of chips(); track chip.label) {\n        <mat-chip disableRipple (removed)=\"removeChip(chip)\">\n          {{ chip.label }}\n          <button matChipRemove [attr.aria-label]=\"`Remove ${chip.label}`\">\n            <mat-icon>close</mat-icon>\n          </button>\n        </mat-chip>\n      }\n    </mat-chip-set>\n  }\n\n  @if (enableDivider()) {\n    <mat-divider />\n  }\n</div>\n", styles: [":host{display:block;width:100%}.filter-container{display:flex;flex-direction:column;gap:.25rem}.filter-container .top-row{display:flex;align-items:center;color:var(--mat-sys-secondary)}.filter-container .top-row .info-icon{padding:.5rem;color:var(--mat-sys-secondary)}.filter-container .top-row .category-button{flex:0 1 auto;min-width:fit-content;justify-content:flex-start;--mat-button-text-horizontal-padding: .75rem;--mat-button-text-label-text-font: var(--mat-sys-label-medium-font)}.filter-container .chips-container{display:flex;flex-wrap:wrap;gap:.25rem}.filter-container .chips-container mat-chip{--mat-chip-label-text-font: var(--mat-sys-label-medium-font);--mat-chip-label-text-line-height: var(--mat-sys-label-medium-line-height);--mat-chip-label-text-size: var(--mat-sys-label-medium-size);--mat-chip-label-text-tracking: var(--mat-sys-label-medium-tracking);--mat-chip-label-text-weight: var(--mat-sys-label-medium-weight);--mat-chip-container-height: 2rem}.filter-container .chips-container mat-chip button[matChipRemove] mat-icon{font-size:1.25rem;width:1.25rem;height:1.25rem;vertical-align:middle}.filter-container mat-divider{margin-top:.5rem}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "ngmodule", type: ButtonsModule }, { kind: "component", type: i1.MatButton, selector: "    button[matButton], a[matButton], button[mat-button], button[mat-raised-button],    button[mat-flat-button], button[mat-stroked-button], a[mat-button], a[mat-raised-button],    a[mat-flat-button], a[mat-stroked-button]  ", inputs: ["matButton"], exportAs: ["matButton", "matAnchor"] }, { kind: "component", type: i2.MatChip, selector: "mat-basic-chip, [mat-basic-chip], mat-chip, [mat-chip]", inputs: ["role", "id", "aria-label", "aria-description", "value", "color", "removable", "highlighted", "disableRipple", "disabled"], outputs: ["removed", "destroyed"], exportAs: ["matChip"] }, { kind: "directive", type: i2.MatChipRemove, selector: "[matChipRemove]" }, { kind: "component", type: i2.MatChipSet, selector: "mat-chip-set", inputs: ["disabled", "role", "tabIndex"] }, { kind: "component", type: i3.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "component", type: i4.InfoButtonComponent, selector: "hra-info-button" }, { kind: "directive", type: i4.InfoButtonTaglineDirective, selector: "[hraInfoButtonTagline]" }, { kind: "directive", type: i4.InfoButtonActionsDirective, selector: "[hraInfoButtonActions]" }, { kind: "directive", type: i5.ButtonVariantDirective, selector: "button[mat-button][hraButtonVariant], a[mat-button][hraButtonVariant]", inputs: ["hraButtonVariant"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "ngmodule", type: MatChipsModule }, { kind: "ngmodule", type: MatDividerModule }, { kind: "component", type: i6.MatDivider, selector: "mat-divider", inputs: ["vertical", "inset"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: FilterContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-filter-container', imports: [
                        HraCommonModule,
                        ButtonsModule,
                        MatIconModule,
                        MatChipsModule,
                        MatDividerModule,
                        InfoButtonComponent,
                        InfoButtonTaglineDirective,
                        InfoButtonActionsDirective,
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"filter-container\">\n  <div class=\"top-row\">\n    @if (showTooltip()) {\n      <hra-info-button>\n        <span hraInfoButtonTagline>{{ action() }}</span>\n        <ng-content select=\"[tooltipContent]\" />\n        <div hraInfoButtonActions>\n          <ng-content select=\"[tooltipActions]\" />\n        </div>\n      </hra-info-button>\n    }\n    <button\n      mat-button\n      hraButtonVariant=\"secondary\"\n      class=\"category-button\"\n      color=\"primary\"\n      (click)=\"actionClick.emit()\"\n    >\n      {{ action() }}\n    </button>\n  </div>\n\n  @if (chips().length > 0) {\n    <mat-chip-set class=\"chips-container\">\n      @for (chip of chips(); track chip.label) {\n        <mat-chip disableRipple (removed)=\"removeChip(chip)\">\n          {{ chip.label }}\n          <button matChipRemove [attr.aria-label]=\"`Remove ${chip.label}`\">\n            <mat-icon>close</mat-icon>\n          </button>\n        </mat-chip>\n      }\n    </mat-chip-set>\n  }\n\n  @if (enableDivider()) {\n    <mat-divider />\n  }\n</div>\n", styles: [":host{display:block;width:100%}.filter-container{display:flex;flex-direction:column;gap:.25rem}.filter-container .top-row{display:flex;align-items:center;color:var(--mat-sys-secondary)}.filter-container .top-row .info-icon{padding:.5rem;color:var(--mat-sys-secondary)}.filter-container .top-row .category-button{flex:0 1 auto;min-width:fit-content;justify-content:flex-start;--mat-button-text-horizontal-padding: .75rem;--mat-button-text-label-text-font: var(--mat-sys-label-medium-font)}.filter-container .chips-container{display:flex;flex-wrap:wrap;gap:.25rem}.filter-container .chips-container mat-chip{--mat-chip-label-text-font: var(--mat-sys-label-medium-font);--mat-chip-label-text-line-height: var(--mat-sys-label-medium-line-height);--mat-chip-label-text-size: var(--mat-sys-label-medium-size);--mat-chip-label-text-tracking: var(--mat-sys-label-medium-tracking);--mat-chip-label-text-weight: var(--mat-sys-label-medium-weight);--mat-chip-container-height: 2rem}.filter-container .chips-container mat-chip button[matChipRemove] mat-icon{font-size:1.25rem;width:1.25rem;height:1.25rem;vertical-align:middle}.filter-container mat-divider{margin-top:.5rem}\n"] }]
        }], propDecorators: { action: [{ type: i0.Input, args: [{ isSignal: true, alias: "action", required: true }] }], showTooltip: [{ type: i0.Input, args: [{ isSignal: true, alias: "showTooltip", required: false }] }], chips: [{ type: i0.Input, args: [{ isSignal: true, alias: "chips", required: false }] }, { type: i0.Output, args: ["chipsChange"] }], enableDivider: [{ type: i0.Input, args: [{ isSignal: true, alias: "enableDivider", required: false }] }], actionClick: [{ type: i0.Output, args: ["actionClick"] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { FilterContainerComponent };
//# sourceMappingURL=hra-ui-design-system-filter-container.mjs.map
