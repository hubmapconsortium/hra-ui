import * as i0 from '@angular/core';
import { input, ChangeDetectionStrategy, ViewEncapsulation, Component } from '@angular/core';
import * as i1 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i4 from '@angular/material/core';
import { MatRippleModule } from '@angular/material/core';
import * as i3 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i2 from '@angular/material/menu';
import { MatMenuModule } from '@angular/material/menu';

/**
 * Nested Angular Material menu component
 */
class MenuDemoComponent {
    /** List of menu options */
    menuOptions = input([], ...(ngDevMode ? [{ debugName: "menuOptions" }] : []));
    /** List of suboptions to display in the second menu */
    suboptions = [];
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: MenuDemoComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.9", type: MenuDemoComponent, isStandalone: true, selector: "hra-menu", inputs: { menuOptions: { classPropertyName: "menuOptions", publicName: "menuOptions", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<button mat-icon-button [matMenuTriggerFor]=\"options\" aria-label=\"Icon to open nested menu\">\n  <mat-icon>more_vert</mat-icon>\n</button>\n\n<mat-menu #options=\"matMenu\">\n  @for (option of menuOptions(); track option) {\n    @if (option.expandedOptions) {\n      <button\n        class=\"expanded\"\n        mat-menu-item\n        matRipple\n        matRippleColor=\"#201E3D14\"\n        [matMenuTriggerFor]=\"submenu\"\n        (mouseover)=\"suboptions = option.expandedOptions\"\n        (focus)=\"(undefined)\"\n      >\n        <mat-icon>{{ option.icon }}</mat-icon>\n        {{ option.name }}\n        <mat-icon class=\"expand-arrow\">arrow_right</mat-icon>\n      </button>\n    } @else {\n      <button mat-menu-item>\n        <mat-icon>{{ option.icon }}</mat-icon>\n        {{ option.name }}\n      </button>\n    }\n  }\n</mat-menu>\n\n<mat-menu #submenu=\"matMenu\">\n  @for (suboption of suboptions; track suboption) {\n    <button mat-menu-item>\n      <mat-icon>{{ suboption.icon }}</mat-icon>\n      <span>{{ suboption.name }}</span>\n    </button>\n  }\n</mat-menu>\n", dependencies: [{ kind: "ngmodule", type: MatButtonModule }, { kind: "component", type: i1.MatIconButton, selector: "button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]", exportAs: ["matButton", "matAnchor"] }, { kind: "ngmodule", type: MatMenuModule }, { kind: "component", type: i2.MatMenu, selector: "mat-menu", inputs: ["backdropClass", "aria-label", "aria-labelledby", "aria-describedby", "xPosition", "yPosition", "overlapTrigger", "hasBackdrop", "class", "classList"], outputs: ["closed", "close"], exportAs: ["matMenu"] }, { kind: "component", type: i2.MatMenuItem, selector: "[mat-menu-item]", inputs: ["role", "disabled", "disableRipple"], exportAs: ["matMenuItem"] }, { kind: "directive", type: i2.MatMenuTrigger, selector: "[mat-menu-trigger-for], [matMenuTriggerFor]", inputs: ["mat-menu-trigger-for", "matMenuTriggerFor", "matMenuTriggerData", "matMenuTriggerRestoreFocus"], outputs: ["menuOpened", "onMenuOpen", "menuClosed", "onMenuClose"], exportAs: ["matMenuTrigger"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i3.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: MatRippleModule }, { kind: "directive", type: i4.MatRipple, selector: "[mat-ripple], [matRipple]", inputs: ["matRippleColor", "matRippleUnbounded", "matRippleCentered", "matRippleRadius", "matRippleAnimation", "matRippleDisabled", "matRippleTrigger"], exportAs: ["matRipple"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: MenuDemoComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-menu', imports: [MatButtonModule, MatMenuModule, MatIconModule, MatRippleModule], encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<button mat-icon-button [matMenuTriggerFor]=\"options\" aria-label=\"Icon to open nested menu\">\n  <mat-icon>more_vert</mat-icon>\n</button>\n\n<mat-menu #options=\"matMenu\">\n  @for (option of menuOptions(); track option) {\n    @if (option.expandedOptions) {\n      <button\n        class=\"expanded\"\n        mat-menu-item\n        matRipple\n        matRippleColor=\"#201E3D14\"\n        [matMenuTriggerFor]=\"submenu\"\n        (mouseover)=\"suboptions = option.expandedOptions\"\n        (focus)=\"(undefined)\"\n      >\n        <mat-icon>{{ option.icon }}</mat-icon>\n        {{ option.name }}\n        <mat-icon class=\"expand-arrow\">arrow_right</mat-icon>\n      </button>\n    } @else {\n      <button mat-menu-item>\n        <mat-icon>{{ option.icon }}</mat-icon>\n        {{ option.name }}\n      </button>\n    }\n  }\n</mat-menu>\n\n<mat-menu #submenu=\"matMenu\">\n  @for (suboption of suboptions; track suboption) {\n    <button mat-menu-item>\n      <mat-icon>{{ suboption.icon }}</mat-icon>\n      <span>{{ suboption.name }}</span>\n    </button>\n  }\n</mat-menu>\n" }]
        }], propDecorators: { menuOptions: [{ type: i0.Input, args: [{ isSignal: true, alias: "menuOptions", required: false }] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { MenuDemoComponent };
//# sourceMappingURL=hra-ui-design-system-menu.mjs.map
