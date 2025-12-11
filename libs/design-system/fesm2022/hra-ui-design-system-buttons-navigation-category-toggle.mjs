import * as i0 from '@angular/core';
import { model, ChangeDetectionStrategy, Component } from '@angular/core';
import * as i2 from '@angular/material/button-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import * as i3 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import * as i1 from '@hra-ui/common/analytics';

/** Navigation toggle button */
class NavigationCategoryToggleComponent {
    /** Whether the button is toggled on/off */
    toggled = model(false, ...(ngDevMode ? [{ debugName: "toggled" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: NavigationCategoryToggleComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.15", type: NavigationCategoryToggleComponent, isStandalone: true, selector: "hra-navigation-category-toggle", inputs: { toggled: { classPropertyName: "toggled", publicName: "toggled", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { toggled: "toggledChange" }, ngImport: i0, template: "<mat-button-toggle\n  class=\"toggle\"\n  [hraClickEvent]=\"{ toggled: toggled() }\"\n  [checked]=\"toggled()\"\n  (change)=\"toggled.set($event.source.checked)\"\n>\n  <span class=\"text\">\n    <ng-content />\n  </span>\n\n  <mat-icon class=\"icon\">\n    @if (toggled()) {\n      expand_less\n    } @else {\n      expand_more\n    }\n  </mat-icon>\n</mat-button-toggle>\n", styles: [":host{display:block;--mat-button-toggle-focus-state-layer-opacity: 0;--mat-button-toggle-selected-state-background-color: transparent}:host .toggle{color:var(--mat-sys-secondary);border:none;border-radius:.25rem}:host .toggle .text{display:inline-block;margin-right:.125rem;font:var(--mat-sys-label-large);letter-spacing:var(--mat-sys-label-large-tracking)}:is(:host .toggle.mat-button-toggle-checked,:host .toggle:hover,:host .toggle:active) .text{text-decoration:underline .125rem var(--mat-sys-tertiary);text-underline-offset:.375rem}:host .toggle ::ng-deep .mat-button-toggle-label-content{padding:0 .5rem}:host .toggle ::ng-deep button:focus-visible{outline:2px solid var(--mat-sys-tertiary);outline-offset:-2px}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "ngmodule", type: MatButtonToggleModule }, { kind: "component", type: i2.MatButtonToggle, selector: "mat-button-toggle", inputs: ["aria-label", "aria-labelledby", "id", "name", "value", "tabIndex", "disableRipple", "appearance", "checked", "disabled", "disabledInteractive"], outputs: ["change"], exportAs: ["matButtonToggle"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i3.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: NavigationCategoryToggleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-navigation-category-toggle', imports: [HraCommonModule, MatButtonToggleModule, MatIconModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<mat-button-toggle\n  class=\"toggle\"\n  [hraClickEvent]=\"{ toggled: toggled() }\"\n  [checked]=\"toggled()\"\n  (change)=\"toggled.set($event.source.checked)\"\n>\n  <span class=\"text\">\n    <ng-content />\n  </span>\n\n  <mat-icon class=\"icon\">\n    @if (toggled()) {\n      expand_less\n    } @else {\n      expand_more\n    }\n  </mat-icon>\n</mat-button-toggle>\n", styles: [":host{display:block;--mat-button-toggle-focus-state-layer-opacity: 0;--mat-button-toggle-selected-state-background-color: transparent}:host .toggle{color:var(--mat-sys-secondary);border:none;border-radius:.25rem}:host .toggle .text{display:inline-block;margin-right:.125rem;font:var(--mat-sys-label-large);letter-spacing:var(--mat-sys-label-large-tracking)}:is(:host .toggle.mat-button-toggle-checked,:host .toggle:hover,:host .toggle:active) .text{text-decoration:underline .125rem var(--mat-sys-tertiary);text-underline-offset:.375rem}:host .toggle ::ng-deep .mat-button-toggle-label-content{padding:0 .5rem}:host .toggle ::ng-deep button:focus-visible{outline:2px solid var(--mat-sys-tertiary);outline-offset:-2px}\n"] }]
        }], propDecorators: { toggled: [{ type: i0.Input, args: [{ isSignal: true, alias: "toggled", required: false }] }, { type: i0.Output, args: ["toggledChange"] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { NavigationCategoryToggleComponent };
//# sourceMappingURL=hra-ui-design-system-buttons-navigation-category-toggle.mjs.map
