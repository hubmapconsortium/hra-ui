import * as i0 from '@angular/core';
import { input, output, ChangeDetectionStrategy, Component } from '@angular/core';
import * as i3 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i2 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import * as i1 from '@hra-ui/common/analytics';

/**
 * Modal to display all available information about specific areas of a dataset.
 * The title names the modal for screen readers and doesn't show.
 */
class InfoModalComponent {
    /** List of data items to display */
    data = input([], ...(ngDevMode ? [{ debugName: "data" }] : /* istanbul ignore next */ []));
    /** Title of modal, which names it for screen readers */
    title = input.required(...(ngDevMode ? [{ debugName: "title" }] : /* istanbul ignore next */ []));
    /** Label and tooltip of the close button */
    closeLabel = input('Close', ...(ngDevMode ? [{ debugName: "closeLabel" }] : /* istanbul ignore next */ []));
    /** Emits when close icon clicked */
    // eslint-disable-next-line @angular-eslint/no-output-native
    close = output();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.26", ngImport: i0, type: InfoModalComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.26", type: InfoModalComponent, isStandalone: true, selector: "hra-info-modal", inputs: { data: { classPropertyName: "data", publicName: "data", isSignal: true, isRequired: false, transformFunction: null }, title: { classPropertyName: "title", publicName: "title", isSignal: true, isRequired: true, transformFunction: null }, closeLabel: { classPropertyName: "closeLabel", publicName: "closeLabel", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { close: "close" }, host: { attributes: { "role": "group" }, properties: { "attr.aria-label": "title()", "attr.title": "null" } }, ngImport: i0, template: "<ng-container hraFeature=\"info-modal\">\n  <!-- A description list: each row holds a label (dt) and its value (dd) -->\n  <dl class=\"details\">\n    @for (item of data(); track $index) {\n      <div>\n        <dt>{{ item.label }}</dt>\n        <dd>{{ item.value }}</dd>\n      </div>\n    }\n  </dl>\n\n  <button\n    mat-icon-button\n    class=\"close\"\n    hraFeature=\"close\"\n    hraClickEvent\n    [attr.aria-label]=\"closeLabel()\"\n    [hraPlainTooltip]=\"closeLabel()\"\n    (click)=\"close.emit()\"\n  >\n    <mat-icon>close</mat-icon>\n  </button>\n</ng-container>\n", styles: [":host{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:start;min-width:min(23.625rem,100vw - 2rem);max-width:min(33.75rem,100vw - 2rem);border-radius:var(--mat-sys-corner-medium);background-color:var(--mat-sys-surface-container);box-shadow:var(--mat-sys-level2)}:host .details{display:grid;grid-template-columns:fit-content(50%) minmax(0,1fr);margin:0;overflow:hidden;border:1px solid var(--mat-sys-outline-variant);border-radius:var(--mat-sys-corner-small);color:var(--mat-sys-on-surface-variant);font:var(--mat-sys-body-medium);letter-spacing:var(--mat-sys-body-medium-tracking)}:host .details>div{display:grid;grid-column:1/-1;grid-template-columns:subgrid}:host .details>div:nth-child(odd){background-color:var(--mat-sys-surface-container-low)}:host .details>div:not(:last-child){border-bottom:1px solid var(--mat-sys-outline-variant)}:host .details dt,:host .details dd{min-width:0;margin:0;padding:.25rem 1rem}:host .details dt{color:var(--mat-sys-on-surface)}:host .details dd{overflow-wrap:anywhere}:host .details{margin:1rem 0 1rem 1rem}:host .close{margin:.5rem .5rem 0 .25rem}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: MatButtonModule }, { kind: "component", type: i3.MatIconButton, selector: "button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]", exportAs: ["matButton", "matAnchor"] }, { kind: "directive", type: PlainTooltipDirective, selector: "[hraPlainTooltip]", inputs: ["hraPlainTooltipSize"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.26", ngImport: i0, type: InfoModalComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-info-modal', imports: [HraCommonModule, MatIconModule, MatButtonModule, PlainTooltipDirective], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        role: 'group',
                        '[attr.aria-label]': 'title()',
                        // A static title also lands on the host as a native title attribute, which shows a browser tooltip over the modal
                        '[attr.title]': 'null',
                    }, template: "<ng-container hraFeature=\"info-modal\">\n  <!-- A description list: each row holds a label (dt) and its value (dd) -->\n  <dl class=\"details\">\n    @for (item of data(); track $index) {\n      <div>\n        <dt>{{ item.label }}</dt>\n        <dd>{{ item.value }}</dd>\n      </div>\n    }\n  </dl>\n\n  <button\n    mat-icon-button\n    class=\"close\"\n    hraFeature=\"close\"\n    hraClickEvent\n    [attr.aria-label]=\"closeLabel()\"\n    [hraPlainTooltip]=\"closeLabel()\"\n    (click)=\"close.emit()\"\n  >\n    <mat-icon>close</mat-icon>\n  </button>\n</ng-container>\n", styles: [":host{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:start;min-width:min(23.625rem,100vw - 2rem);max-width:min(33.75rem,100vw - 2rem);border-radius:var(--mat-sys-corner-medium);background-color:var(--mat-sys-surface-container);box-shadow:var(--mat-sys-level2)}:host .details{display:grid;grid-template-columns:fit-content(50%) minmax(0,1fr);margin:0;overflow:hidden;border:1px solid var(--mat-sys-outline-variant);border-radius:var(--mat-sys-corner-small);color:var(--mat-sys-on-surface-variant);font:var(--mat-sys-body-medium);letter-spacing:var(--mat-sys-body-medium-tracking)}:host .details>div{display:grid;grid-column:1/-1;grid-template-columns:subgrid}:host .details>div:nth-child(odd){background-color:var(--mat-sys-surface-container-low)}:host .details>div:not(:last-child){border-bottom:1px solid var(--mat-sys-outline-variant)}:host .details dt,:host .details dd{min-width:0;margin:0;padding:.25rem 1rem}:host .details dt{color:var(--mat-sys-on-surface)}:host .details dd{overflow-wrap:anywhere}:host .details{margin:1rem 0 1rem 1rem}:host .close{margin:.5rem .5rem 0 .25rem}\n"] }]
        }], propDecorators: { data: [{ type: i0.Input, args: [{ isSignal: true, alias: "data", required: false }] }], title: [{ type: i0.Input, args: [{ isSignal: true, alias: "title", required: true }] }], closeLabel: [{ type: i0.Input, args: [{ isSignal: true, alias: "closeLabel", required: false }] }], close: [{ type: i0.Output, args: ["close"] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { InfoModalComponent };
//# sourceMappingURL=hra-ui-design-system-modal-info-modal.mjs.map
