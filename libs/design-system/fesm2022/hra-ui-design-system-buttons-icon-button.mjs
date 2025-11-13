import * as i0 from '@angular/core';
import { input, Directive, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * Directive for icon buttons
 */
class IconButtonSizeDirective {
    /** Size of icon button to use */
    size = input.required(...(ngDevMode ? [{ debugName: "size", alias: 'hraIconButtonSize' }] : [{ alias: 'hraIconButtonSize' }]));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: IconButtonSizeDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.11", type: IconButtonSizeDirective, isStandalone: true, selector: "[hraIconButtonSize]", inputs: { size: { classPropertyName: "size", publicName: "hraIconButtonSize", isSignal: true, isRequired: true, transformFunction: null } }, host: { properties: { "class": "\"hra-icon-button-size-\" + size()" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: IconButtonSizeDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[hraIconButtonSize]',
                    host: {
                        '[class]': '"hra-icon-button-size-" + size()',
                    },
                }]
        }], propDecorators: { size: [{ type: i0.Input, args: [{ isSignal: true, alias: "hraIconButtonSize", required: true }] }] } });

/**
 * Directive for icon button variants (color)
 */
class IconButtonVariantDirective {
    /** Input for icon button color variant */
    variant = input('dark', ...(ngDevMode ? [{ debugName: "variant", alias: 'hraIconButtonVariant' }] : [{ alias: 'hraIconButtonVariant' }]));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: IconButtonVariantDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.11", type: IconButtonVariantDirective, isStandalone: true, selector: "[hraIconButtonVariant]", inputs: { variant: { classPropertyName: "variant", publicName: "hraIconButtonVariant", isSignal: true, isRequired: false, transformFunction: null } }, host: { properties: { "class": "\"hra-icon-button-variant-\" + variant()" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: IconButtonVariantDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[hraIconButtonVariant]',
                    host: {
                        '[class]': '"hra-icon-button-variant-" + variant()',
                    },
                }]
        }], propDecorators: { variant: [{ type: i0.Input, args: [{ isSignal: true, alias: "hraIconButtonVariant", required: false }] }] } });

/** Module exporting icon button and related utilities */
class IconButtonModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: IconButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.11", ngImport: i0, type: IconButtonModule, imports: [IconButtonSizeDirective, IconButtonVariantDirective], exports: [MatButtonModule, MatIconModule, IconButtonSizeDirective, IconButtonVariantDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: IconButtonModule, imports: [MatButtonModule, MatIconModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: IconButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [IconButtonSizeDirective, IconButtonVariantDirective],
                    exports: [MatButtonModule, MatIconModule, IconButtonSizeDirective, IconButtonVariantDirective],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { IconButtonModule, IconButtonSizeDirective, IconButtonVariantDirective };
//# sourceMappingURL=hra-ui-design-system-buttons-icon-button.mjs.map
