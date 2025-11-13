import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { input, ChangeDetectionStrategy, Component } from '@angular/core';
import * as i2 from '@angular/material/button-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { HraCommonModule } from '@hra-ui/common';
import { BrandMarkComponent } from '@hra-ui/design-system/brand/mark';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { IconComponent } from '@hra-ui/design-system/icons';
import { SoftwareStatusIndicatorComponent } from '@hra-ui/design-system/indicators/software-status-indicator';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import * as i1 from '@hra-ui/common/analytics';

/**
 * Logo buttons used in webpage navigation headers, side navigation menus, and application header toolbars.
 */
class NavHeaderButtonsComponent {
    /** Variant of logo component */
    variant = input('basic', ...(ngDevMode ? [{ debugName: "variant" }] : []));
    /** App software status */
    appStatus = input(...(ngDevMode ? [undefined, { debugName: "appStatus" }] : []));
    /** Whether to show the HRA brandmark */
    brandmark = input(true, ...(ngDevMode ? [{ debugName: "brandmark" }] : []));
    /** Current app */
    app = input.required(...(ngDevMode ? [{ debugName: "app" }] : []));
    /** Link to app home page */
    appLink = input.required(...(ngDevMode ? [{ debugName: "appLink" }] : []));
    /** App title */
    appTitle = input.required(...(ngDevMode ? [{ debugName: "appTitle" }] : []));
    /** Tooltip displayed when user hovers over the HRA logo */
    hraTooltip = input(...(ngDevMode ? [undefined, { debugName: "hraTooltip" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: NavHeaderButtonsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.11", type: NavHeaderButtonsComponent, isStandalone: true, selector: "hra-nav-header-buttons", inputs: { variant: { classPropertyName: "variant", publicName: "variant", isSignal: true, isRequired: false, transformFunction: null }, appStatus: { classPropertyName: "appStatus", publicName: "appStatus", isSignal: true, isRequired: false, transformFunction: null }, brandmark: { classPropertyName: "brandmark", publicName: "brandmark", isSignal: true, isRequired: false, transformFunction: null }, app: { classPropertyName: "app", publicName: "app", isSignal: true, isRequired: true, transformFunction: null }, appLink: { classPropertyName: "appLink", publicName: "appLink", isSignal: true, isRequired: true, transformFunction: null }, appTitle: { classPropertyName: "appTitle", publicName: "appTitle", isSignal: true, isRequired: true, transformFunction: null }, hraTooltip: { classPropertyName: "hraTooltip", publicName: "hraTooltip", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<ng-container hraFeature=\"nav-header-buttons\">\n  @if (brandmark()) {\n    <a\n      class=\"hra-logo\"\n      hraFeature=\"humanatlas\"\n      hraClickEvent\n      href=\"https://humanatlas.io\"\n      target=\"_blank\"\n      rel=\"noopener noreferrer\"\n      aria-label=\"Visit Human Reference Atlas\"\n      [hraPlainTooltip]=\"hraTooltip()\"\n    >\n      <hra-brand-mark variant=\"small\" />\n    </a>\n  }\n  <a class=\"app-logo\" hraFeature=\"app\" hraClickEvent [attr.href]=\"appLink()\" [attr.alt]=\"`${appTitle()} logo`\">\n    <hra-icon [svgIcon]=\"app()\" />\n  </a>\n\n  <span class=\"logos-text\">\n    @if (variant() === 'sidenav') {\n      <mat-button-toggle class=\"app-name-nav\" value=\"bold\" disableRipple>\n        <span class=\"label\">{{ appTitle() }}</span>\n      </mat-button-toggle>\n    } @else {\n      <a class=\"app-name\" hraFeature=\"app\" hraClickEvent aria-label=\"Return to app home\" [href]=\"appLink()\">\n        <span class=\"app-label\">{{ appTitle() }}</span>\n      </a>\n    }\n    @if (appStatus()) {\n      <hra-software-status-indicator size=\"small\" [status]=\"appStatus()!\" />\n    }\n  </span>\n</ng-container>\n", styles: [":host{display:flex;height:2.5rem}:host>a{display:inline-block}:host .hra-logo,:host .app-logo{display:inline-flex;color:var(--mat-sys-secondary)}:host .hra-logo{margin-right:.25rem;width:2.5rem}:host .app-logo{margin-right:.125rem}:host .logos-text{display:flex;flex-direction:column;justify-content:center}:host .logos-text .app-label{font:var(--mat-sys-label-large);letter-spacing:var(--mat-sys-label-large-tracking)}:host .app-name{margin-left:.5rem;color:var(--mat-sys-secondary);text-decoration:none}:host mat-button-toggle{--mat-button-toggle-height: 1.25rem}:host mat-button-toggle ::ng-deep .mat-button-toggle-button{display:flex;align-items:center}:host hra-software-status-indicator{margin-left:.5rem}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "component", type: BrandMarkComponent, selector: "hra-brand-mark", inputs: ["variant"] }, { kind: "ngmodule", type: ButtonsModule }, { kind: "component", type: i2.MatButtonToggle, selector: "mat-button-toggle", inputs: ["aria-label", "aria-labelledby", "id", "name", "value", "tabIndex", "disableRipple", "appearance", "checked", "disabled", "disabledInteractive"], outputs: ["change"], exportAs: ["matButtonToggle"] }, { kind: "ngmodule", type: CommonModule }, { kind: "component", type: IconComponent, selector: "hra-icon", inputs: ["icon", "svgIcon", "fontIcon", "fontSet", "inline"] }, { kind: "ngmodule", type: MatButtonToggleModule }, { kind: "directive", type: PlainTooltipDirective, selector: "[hraPlainTooltip]", inputs: ["hraPlainTooltipSize"] }, { kind: "component", type: SoftwareStatusIndicatorComponent, selector: "hra-software-status-indicator", inputs: ["status", "size"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: NavHeaderButtonsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-nav-header-buttons', imports: [
                        HraCommonModule,
                        BrandMarkComponent,
                        ButtonsModule,
                        CommonModule,
                        IconComponent,
                        MatButtonToggleModule,
                        PlainTooltipDirective,
                        SoftwareStatusIndicatorComponent,
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container hraFeature=\"nav-header-buttons\">\n  @if (brandmark()) {\n    <a\n      class=\"hra-logo\"\n      hraFeature=\"humanatlas\"\n      hraClickEvent\n      href=\"https://humanatlas.io\"\n      target=\"_blank\"\n      rel=\"noopener noreferrer\"\n      aria-label=\"Visit Human Reference Atlas\"\n      [hraPlainTooltip]=\"hraTooltip()\"\n    >\n      <hra-brand-mark variant=\"small\" />\n    </a>\n  }\n  <a class=\"app-logo\" hraFeature=\"app\" hraClickEvent [attr.href]=\"appLink()\" [attr.alt]=\"`${appTitle()} logo`\">\n    <hra-icon [svgIcon]=\"app()\" />\n  </a>\n\n  <span class=\"logos-text\">\n    @if (variant() === 'sidenav') {\n      <mat-button-toggle class=\"app-name-nav\" value=\"bold\" disableRipple>\n        <span class=\"label\">{{ appTitle() }}</span>\n      </mat-button-toggle>\n    } @else {\n      <a class=\"app-name\" hraFeature=\"app\" hraClickEvent aria-label=\"Return to app home\" [href]=\"appLink()\">\n        <span class=\"app-label\">{{ appTitle() }}</span>\n      </a>\n    }\n    @if (appStatus()) {\n      <hra-software-status-indicator size=\"small\" [status]=\"appStatus()!\" />\n    }\n  </span>\n</ng-container>\n", styles: [":host{display:flex;height:2.5rem}:host>a{display:inline-block}:host .hra-logo,:host .app-logo{display:inline-flex;color:var(--mat-sys-secondary)}:host .hra-logo{margin-right:.25rem;width:2.5rem}:host .app-logo{margin-right:.125rem}:host .logos-text{display:flex;flex-direction:column;justify-content:center}:host .logos-text .app-label{font:var(--mat-sys-label-large);letter-spacing:var(--mat-sys-label-large-tracking)}:host .app-name{margin-left:.5rem;color:var(--mat-sys-secondary);text-decoration:none}:host mat-button-toggle{--mat-button-toggle-height: 1.25rem}:host mat-button-toggle ::ng-deep .mat-button-toggle-button{display:flex;align-items:center}:host hra-software-status-indicator{margin-left:.5rem}\n"] }]
        }], propDecorators: { variant: [{ type: i0.Input, args: [{ isSignal: true, alias: "variant", required: false }] }], appStatus: [{ type: i0.Input, args: [{ isSignal: true, alias: "appStatus", required: false }] }], brandmark: [{ type: i0.Input, args: [{ isSignal: true, alias: "brandmark", required: false }] }], app: [{ type: i0.Input, args: [{ isSignal: true, alias: "app", required: true }] }], appLink: [{ type: i0.Input, args: [{ isSignal: true, alias: "appLink", required: true }] }], appTitle: [{ type: i0.Input, args: [{ isSignal: true, alias: "appTitle", required: true }] }], hraTooltip: [{ type: i0.Input, args: [{ isSignal: true, alias: "hraTooltip", required: false }] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { NavHeaderButtonsComponent };
//# sourceMappingURL=hra-ui-design-system-nav-header-buttons.mjs.map
