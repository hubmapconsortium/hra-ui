import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import * as z from 'zod';
import * as i0 from '@angular/core';
import { Directive, input, computed, isSignal, ChangeDetectionStrategy, Component } from '@angular/core';
import * as i1 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i2 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';

/** HRA button schema */
const ButtonSchema = ContentTemplateSchema.extend({
    component: z.literal('Button'),
    label: z.string(),
    href: z.string(),
    type: z.enum(['default', 'flat', 'cta', 'fab']).optional(),
    variant: z.enum(['primary', 'secondary']).optional(),
    size: z.enum(['small', 'medium']).optional(),
    disabled: z.boolean().optional(),
    icon: z.string().optional(),
}).meta({ id: 'Button' });

/** Turns a mat-button into a call-to-action styled button */
class CtaButtonDirective {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: CtaButtonDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.15", type: CtaButtonDirective, isStandalone: true, selector: "button[mat-button][hraCtaButton], a[mat-button][hraCtaButton]", host: { classAttribute: "hra-cta-button" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: CtaButtonDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'button[mat-button][hraCtaButton], a[mat-button][hraCtaButton]',
                    host: {
                        class: 'hra-cta-button',
                    },
                }]
        }] });

/** Style a mat-button to a specific named size */
class ButtonSizeDirective {
    /** Size of button */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    size = input.required(...(ngDevMode ? [{ debugName: "size", alias: 'hraButtonSize' }] : [{ alias: 'hraButtonSize' }]));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ButtonSizeDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.15", type: ButtonSizeDirective, isStandalone: true, selector: "button[mat-button][hraButtonSize], button[mat-flat-button][hraButtonSize], a[mat-button][hraButtonSize]", inputs: { size: { classPropertyName: "size", publicName: "hraButtonSize", isSignal: true, isRequired: true, transformFunction: null } }, host: { properties: { "class": "\"hra-button-size-\" + size()" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ButtonSizeDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'button[mat-button][hraButtonSize], button[mat-flat-button][hraButtonSize], a[mat-button][hraButtonSize]',
                    host: {
                        '[class]': '"hra-button-size-" + size()',
                    },
                }]
        }], propDecorators: { size: [{ type: i0.Input, args: [{ isSignal: true, alias: "hraButtonSize", required: true }] }] } });

/** Base class for variant directives */
class BaseButtonVariantDirective {
    /** Variant class applied to the button */
    variantClass = computed(() => {
        const { variant } = this;
        const variantValue = isSignal(variant) ? variant() : variant;
        return `hra-button-variant-${variantValue}`;
    }, ...(ngDevMode ? [{ debugName: "variantClass" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: BaseButtonVariantDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.15", type: BaseButtonVariantDirective, isStandalone: true, host: { properties: { "class": "variantClass()" } }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: BaseButtonVariantDirective, decorators: [{
            type: Directive,
            args: [{
                    host: {
                        '[class]': 'variantClass()',
                    },
                }]
        }] });
/** Style a mat-button to a specific named variant */
class ButtonVariantDirective extends BaseButtonVariantDirective {
    /** Button variant */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    variant = input.required(...(ngDevMode ? [{ debugName: "variant", alias: 'hraButtonVariant' }] : [{ alias: 'hraButtonVariant' }]));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ButtonVariantDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "17.1.0", version: "20.3.15", type: ButtonVariantDirective, isStandalone: true, selector: "button[mat-button][hraButtonVariant], a[mat-button][hraButtonVariant]", inputs: { variant: { classPropertyName: "variant", publicName: "hraButtonVariant", isSignal: true, isRequired: true, transformFunction: null } }, usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ButtonVariantDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'button[mat-button][hraButtonVariant], a[mat-button][hraButtonVariant]',
                }]
        }], propDecorators: { variant: [{ type: i0.Input, args: [{ isSignal: true, alias: "hraButtonVariant", required: true }] }] } });
/** Style a mat-button as a primary variant button */
class PrimaryButtonVariantDirective extends BaseButtonVariantDirective {
    /** Button variant */
    variant = 'primary';
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: PrimaryButtonVariantDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.15", type: PrimaryButtonVariantDirective, isStandalone: true, selector: "button[mat-button][hraPrimaryButton], a[mat-button][hraPrimaryButton]", usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: PrimaryButtonVariantDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'button[mat-button][hraPrimaryButton], a[mat-button][hraPrimaryButton]',
                }]
        }] });
/** Style a mat-button as a secondary variant button */
class SecondaryButtonVariantDirective extends BaseButtonVariantDirective {
    /** Button variant */
    variant = 'secondary';
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: SecondaryButtonVariantDirective, deps: null, target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.15", type: SecondaryButtonVariantDirective, isStandalone: true, selector: "button[mat-button][hraSecondaryButton], a[mat-button][hraSecondaryButton]", usesInheritance: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: SecondaryButtonVariantDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'button[mat-button][hraSecondaryButton], a[mat-button][hraSecondaryButton]',
                }]
        }] });

/**
 * HRA button component to be used in design system templates
 */
class ButtonComponent {
    /** Button label */
    label = input.required(...(ngDevMode ? [{ debugName: "label" }] : []));
    /** Button link */
    href = input.required(...(ngDevMode ? [{ debugName: "href" }] : []));
    /** Button version */
    type = input('default', ...(ngDevMode ? [{ debugName: "type" }] : []));
    /** Button color variant */
    variant = input('primary', ...(ngDevMode ? [{ debugName: "variant" }] : []));
    /** Button size */
    size = input('medium', ...(ngDevMode ? [{ debugName: "size" }] : []));
    /** Whether button is disabled */
    disabled = input(false, ...(ngDevMode ? [{ debugName: "disabled" }] : []));
    /** Icon to use in the button (can't be changed for CTA button) */
    icon = input(...(ngDevMode ? [undefined, { debugName: "icon" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.15", type: ButtonComponent, isStandalone: true, selector: "hra-button", inputs: { label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: true, transformFunction: null }, href: { classPropertyName: "href", publicName: "href", isSignal: true, isRequired: true, transformFunction: null }, type: { classPropertyName: "type", publicName: "type", isSignal: true, isRequired: false, transformFunction: null }, variant: { classPropertyName: "variant", publicName: "variant", isSignal: true, isRequired: false, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null }, icon: { classPropertyName: "icon", publicName: "icon", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "@switch (type()) {\n  @case ('default') {\n    <a\n      mat-button\n      target=\"_blank\"\n      [hraButtonVariant]=\"variant()\"\n      [hraButtonSize]=\"size()\"\n      [disabled]=\"disabled()\"\n      [href]=\"href()\"\n    >\n      {{ label() }}\n      @if (size() !== 'small' && icon()) {\n        <mat-icon>{{ icon() }}</mat-icon>\n      }\n    </a>\n  }\n  @case ('flat') {\n    <a mat-flat-button target=\"_blank\" [disabled]=\"disabled()\" [href]=\"href()\">\n      {{ label() }}\n      <mat-icon>{{ icon() }}</mat-icon>\n    </a>\n  }\n  @case ('cta') {\n    <a mat-button hraCtaButton target=\"_blank\" [hraButtonVariant]=\"variant()\" [disabled]=\"disabled()\" [href]=\"href()\">\n      {{ label() }}\n      <mat-icon iconPositionEnd>arrow_right_alt</mat-icon>\n    </a>\n  }\n  @case ('fab') {\n    <a mat-fab extended target=\"_blank\" [disabled]=\"disabled()\" [href]=\"href()\">\n      <mat-icon>{{ icon() }}</mat-icon>\n      {{ label() }}\n    </a>\n  }\n}\n", styles: [":host{display:block}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "ngmodule", type: MatButtonModule }, { kind: "component", type: i1.MatButton, selector: "    button[matButton], a[matButton], button[mat-button], button[mat-raised-button],    button[mat-flat-button], button[mat-stroked-button], a[mat-button], a[mat-raised-button],    a[mat-flat-button], a[mat-stroked-button]  ", inputs: ["matButton"], exportAs: ["matButton", "matAnchor"] }, { kind: "component", type: i1.MatFabButton, selector: "button[mat-fab], a[mat-fab], button[matFab], a[matFab]", inputs: ["extended"], exportAs: ["matButton", "matAnchor"] }, { kind: "ngmodule", type: MatIconModule }, { kind: "component", type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "directive", type: CtaButtonDirective, selector: "button[mat-button][hraCtaButton], a[mat-button][hraCtaButton]" }, { kind: "directive", type: ButtonSizeDirective, selector: "button[mat-button][hraButtonSize], button[mat-flat-button][hraButtonSize], a[mat-button][hraButtonSize]", inputs: ["hraButtonSize"] }, { kind: "directive", type: ButtonVariantDirective, selector: "button[mat-button][hraButtonVariant], a[mat-button][hraButtonVariant]", inputs: ["hraButtonVariant"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.15", ngImport: i0, type: ButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-button', imports: [
                        HraCommonModule,
                        MatButtonModule,
                        MatIconModule,
                        CtaButtonDirective,
                        ButtonSizeDirective,
                        ButtonVariantDirective,
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "@switch (type()) {\n  @case ('default') {\n    <a\n      mat-button\n      target=\"_blank\"\n      [hraButtonVariant]=\"variant()\"\n      [hraButtonSize]=\"size()\"\n      [disabled]=\"disabled()\"\n      [href]=\"href()\"\n    >\n      {{ label() }}\n      @if (size() !== 'small' && icon()) {\n        <mat-icon>{{ icon() }}</mat-icon>\n      }\n    </a>\n  }\n  @case ('flat') {\n    <a mat-flat-button target=\"_blank\" [disabled]=\"disabled()\" [href]=\"href()\">\n      {{ label() }}\n      <mat-icon>{{ icon() }}</mat-icon>\n    </a>\n  }\n  @case ('cta') {\n    <a mat-button hraCtaButton target=\"_blank\" [hraButtonVariant]=\"variant()\" [disabled]=\"disabled()\" [href]=\"href()\">\n      {{ label() }}\n      <mat-icon iconPositionEnd>arrow_right_alt</mat-icon>\n    </a>\n  }\n  @case ('fab') {\n    <a mat-fab extended target=\"_blank\" [disabled]=\"disabled()\" [href]=\"href()\">\n      <mat-icon>{{ icon() }}</mat-icon>\n      {{ label() }}\n    </a>\n  }\n}\n", styles: [":host{display:block}\n"] }]
        }], propDecorators: { label: [{ type: i0.Input, args: [{ isSignal: true, alias: "label", required: true }] }], href: [{ type: i0.Input, args: [{ isSignal: true, alias: "href", required: true }] }], type: [{ type: i0.Input, args: [{ isSignal: true, alias: "type", required: false }] }], variant: [{ type: i0.Input, args: [{ isSignal: true, alias: "variant", required: false }] }], size: [{ type: i0.Input, args: [{ isSignal: true, alias: "size", required: false }] }], disabled: [{ type: i0.Input, args: [{ isSignal: true, alias: "disabled", required: false }] }], icon: [{ type: i0.Input, args: [{ isSignal: true, alias: "icon", required: false }] }] } });

/** Content template definition for DataViewerComponent */
const ButtonDef = {
    component: ButtonComponent,
    spec: ButtonSchema,
};

/**
 * Generated bundle index. Do not edit.
 */

export { ButtonDef, ButtonSchema, ButtonSizeDirective, ButtonVariantDirective, CtaButtonDirective, PrimaryButtonVariantDirective, SecondaryButtonVariantDirective };
//# sourceMappingURL=hra-ui-design-system-buttons-button.mjs.map
