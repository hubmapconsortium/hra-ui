import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { input, ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import * as i1 from '@hra-ui/design-system/icons';
import { IconsModule } from '@hra-ui/design-system/icons';
import { SoftwareStatusIndicatorComponent } from '@hra-ui/design-system/indicators/software-status-indicator';

/**
 * App Label Component
 */
class AppLabelComponent {
    /** Product title */
    tagline = input.required(...(ngDevMode ? [{ debugName: "tagline" }] : []));
    /** Product logo */
    logo = input.required(...(ngDevMode ? [{ debugName: "logo" }] : []));
    /** App software status */
    appStatus = input(...(ngDevMode ? [undefined, { debugName: "appStatus" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: AppLabelComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.3", type: AppLabelComponent, isStandalone: true, selector: "hra-app-label", inputs: { tagline: { classPropertyName: "tagline", publicName: "tagline", isSignal: true, isRequired: true, transformFunction: null }, logo: { classPropertyName: "logo", publicName: "logo", isSignal: true, isRequired: true, transformFunction: null }, appStatus: { classPropertyName: "appStatus", publicName: "appStatus", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<hra-icon class=\"product-logo\" [svgIcon]=\"logo()\" />\n<div class=\"ui-content-header\">\n  <h1>\n    {{ tagline() }}\n  </h1>\n  @if (appStatus(); as status) {\n    <hra-software-status-indicator [status]=\"status\" size=\"large\" />\n  }\n</div>\n", styles: [":host{display:flex;align-items:center;gap:1.5rem;font:var(--mat-sys-display-large);letter-spacing:var(--mat-sys-display-large-tracking)}:host p{margin:0}:host .product-logo{height:5rem;width:5rem;flex-shrink:0}:host .ui-content-header{display:flex;flex-direction:column;min-width:19.25rem;gap:.25rem}:host .ui-content-header h1{margin:0;font:inherit;letter-spacing:inherit;color:var(--mat-sys-on-background)}@media (max-width: 639px){:host{flex-direction:column;align-items:flex-start}}\n"], dependencies: [{ kind: "ngmodule", type: ButtonsModule }, { kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: IconsModule }, { kind: "component", type: i1.IconComponent, selector: "hra-icon", inputs: ["icon", "svgIcon", "fontIcon", "fontSet", "inline"] }, { kind: "component", type: SoftwareStatusIndicatorComponent, selector: "hra-software-status-indicator", inputs: ["status", "size"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.3", ngImport: i0, type: AppLabelComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-app-label', imports: [ButtonsModule, CommonModule, IconsModule, SoftwareStatusIndicatorComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<hra-icon class=\"product-logo\" [svgIcon]=\"logo()\" />\n<div class=\"ui-content-header\">\n  <h1>\n    {{ tagline() }}\n  </h1>\n  @if (appStatus(); as status) {\n    <hra-software-status-indicator [status]=\"status\" size=\"large\" />\n  }\n</div>\n", styles: [":host{display:flex;align-items:center;gap:1.5rem;font:var(--mat-sys-display-large);letter-spacing:var(--mat-sys-display-large-tracking)}:host p{margin:0}:host .product-logo{height:5rem;width:5rem;flex-shrink:0}:host .ui-content-header{display:flex;flex-direction:column;min-width:19.25rem;gap:.25rem}:host .ui-content-header h1{margin:0;font:inherit;letter-spacing:inherit;color:var(--mat-sys-on-background)}@media (max-width: 639px){:host{flex-direction:column;align-items:flex-start}}\n"] }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { AppLabelComponent };
//# sourceMappingURL=hra-ui-design-system-content-templates-app-label.mjs.map
