import * as i0 from '@angular/core';
import { output, ChangeDetectionStrategy, Component } from '@angular/core';
import * as i1 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import * as i2 from '@angular/material/button';

/** Back bar component used when an application is embedded */
class BackButtonBarComponent {
    /** Emits when the back button is clicked */
    backClick = output();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: BackButtonBarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.15", type: BackButtonBarComponent, isStandalone: true, selector: "hra-back-button-bar", outputs: { backClick: "backClick" }, ngImport: i0, template: "<button mat-button (click)=\"backClick.emit()\">\n  <mat-icon>keyboard_backspace</mat-icon>\n  Back\n</button>\n", styles: [":host{display:block;width:100%;height:3rem;padding:.25rem;background-color:rgb(from var(--mat-sys-surface-bright) r g b/80%);-webkit-backdrop-filter:blur(10rem);backdrop-filter:blur(10rem);box-shadow:0 .25rem .25rem rgb(from var(--mat-sys-secondary) r g b/20%)}\n"], dependencies: [{ kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i1.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "ngmodule", type: ButtonsModule }, { kind: "component", type: i2.MatButton, selector: "    button[matButton], a[matButton], button[mat-button], button[mat-raised-button],    button[mat-flat-button], button[mat-stroked-button], a[mat-button], a[mat-raised-button],    a[mat-flat-button], a[mat-stroked-button]  ", inputs: ["matButton"], exportAs: ["matButton", "matAnchor"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: BackButtonBarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-back-button-bar', imports: [MatIconModule, ButtonsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button mat-button (click)=\"backClick.emit()\">\n  <mat-icon>keyboard_backspace</mat-icon>\n  Back\n</button>\n", styles: [":host{display:block;width:100%;height:3rem;padding:.25rem;background-color:rgb(from var(--mat-sys-surface-bright) r g b/80%);-webkit-backdrop-filter:blur(10rem);backdrop-filter:blur(10rem);box-shadow:0 .25rem .25rem rgb(from var(--mat-sys-secondary) r g b/20%)}\n"] }]
        }], propDecorators: { backClick: [{ type: i0.Output, args: ["backClick"] }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { BackButtonBarComponent };
//# sourceMappingURL=hra-ui-design-system-navigation-back-button-bar.mjs.map
