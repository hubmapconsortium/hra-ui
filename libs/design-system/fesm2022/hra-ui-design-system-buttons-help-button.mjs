import * as i0 from '@angular/core';
import { input, ChangeDetectionStrategy, Component } from '@angular/core';
import * as i3 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i1 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i2 from '@angular/material/menu';
import { MatMenuModule } from '@angular/material/menu';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';

/**
 * Help button component that renders either a link or menu trigger
 */
class HelpButtonComponent {
    /** Action for the button - URL string for link or MatMenuPanel for menu */
    action = input.required(...(ngDevMode ? [{ debugName: "action" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: HelpButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.12", type: HelpButtonComponent, isStandalone: true, selector: "hra-help-button", inputs: { action: { classPropertyName: "action", publicName: "action", isSignal: true, isRequired: true, transformFunction: null } }, ngImport: i0, template: "@let value = action();\n\n@if (typeof value === 'string') {\n  <a\n    mat-icon-button\n    aria-label=\"Visit help and documentation page\"\n    hraPlainTooltip=\"Help & documentation\"\n    [attr.href]=\"value\"\n  >\n    <mat-icon>help</mat-icon>\n  </a>\n} @else {\n  <button\n    mat-icon-button\n    aria-label=\"Open help and documentation menu\"\n    hraPlainTooltip=\"Help & documentation\"\n    [matMenuTriggerFor]=\"value\"\n  >\n    <mat-icon>help</mat-icon>\n  </button>\n}\n", styles: [":host{display:block}\n"], dependencies: [{ kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i1.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "directive", type: PlainTooltipDirective, selector: "[hraPlainTooltip]", inputs: ["hraPlainTooltipSize"] }, { kind: "ngmodule", type: MatMenuModule }, { kind: "directive", type: i2.MatMenuTrigger, selector: "[mat-menu-trigger-for], [matMenuTriggerFor]", inputs: ["mat-menu-trigger-for", "matMenuTriggerFor", "matMenuTriggerData", "matMenuTriggerRestoreFocus"], outputs: ["menuOpened", "onMenuOpen", "menuClosed", "onMenuClose"], exportAs: ["matMenuTrigger"] }, { kind: "ngmodule", type: MatButtonModule }, { kind: "component", type: i3.MatIconButton, selector: "button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]", exportAs: ["matButton", "matAnchor"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.12", ngImport: i0, type: HelpButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-help-button', imports: [MatIconModule, PlainTooltipDirective, MatMenuModule, MatButtonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "@let value = action();\n\n@if (typeof value === 'string') {\n  <a\n    mat-icon-button\n    aria-label=\"Visit help and documentation page\"\n    hraPlainTooltip=\"Help & documentation\"\n    [attr.href]=\"value\"\n  >\n    <mat-icon>help</mat-icon>\n  </a>\n} @else {\n  <button\n    mat-icon-button\n    aria-label=\"Open help and documentation menu\"\n    hraPlainTooltip=\"Help & documentation\"\n    [matMenuTriggerFor]=\"value\"\n  >\n    <mat-icon>help</mat-icon>\n  </button>\n}\n", styles: [":host{display:block}\n"] }]
        }], propDecorators: { action: [{ type: i0.Input, args: [{ isSignal: true, alias: "action", required: true }] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { HelpButtonComponent };
//# sourceMappingURL=hra-ui-design-system-buttons-help-button.mjs.map
