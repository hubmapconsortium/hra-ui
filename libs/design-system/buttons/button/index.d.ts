import { z } from 'zod';
import { ContentTemplateDef } from '@hra-ui/cdk/content-template';
import * as i0 from '@angular/core';
import { Signal } from '@angular/core';

/** HRA button schema */
declare const ButtonSchema: z.ZodObject<{
    classes: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>, z.ZodRecord<z.ZodString, z.ZodAny>]>>;
    styles: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodRecord<z.ZodString, z.ZodAny>]>>;
    controllers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
    }, z.core.$loose>>>;
    component: z.ZodLiteral<"Button">;
    label: z.ZodString;
    href: z.ZodString;
    type: z.ZodOptional<z.ZodEnum<{
        default: "default";
        flat: "flat";
        cta: "cta";
        fab: "fab";
    }>>;
    variant: z.ZodOptional<z.ZodEnum<{
        primary: "primary";
        secondary: "secondary";
    }>>;
    size: z.ZodOptional<z.ZodEnum<{
        small: "small";
        medium: "medium";
    }>>;
    disabled: z.ZodOptional<z.ZodBoolean>;
    icon: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;

/** Named button sizes */
type ButtonSize = 'small' | 'medium' | 'large';
/** Style a mat-button to a specific named size */
declare class ButtonSizeDirective {
    /** Size of button */
    readonly size: i0.InputSignal<ButtonSize>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonSizeDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ButtonSizeDirective, "button[mat-button][hraButtonSize], button[mat-flat-button][hraButtonSize], a[mat-button][hraButtonSize]", never, { "size": { "alias": "hraButtonSize"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}

/** Named button variants */
type ButtonVariant = 'primary' | 'secondary';
/** Base class for variant directives */
declare abstract class BaseButtonVariantDirective {
    /** Button variant */
    abstract readonly variant: ButtonVariant | Signal<ButtonVariant>;
    /** Variant class applied to the button */
    protected readonly variantClass: Signal<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BaseButtonVariantDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BaseButtonVariantDirective, never, never, {}, {}, never, never, true, never>;
}
/** Style a mat-button to a specific named variant */
declare class ButtonVariantDirective extends BaseButtonVariantDirective {
    /** Button variant */
    readonly variant: i0.InputSignal<ButtonVariant>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonVariantDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ButtonVariantDirective, "button[mat-button][hraButtonVariant], a[mat-button][hraButtonVariant]", never, { "variant": { "alias": "hraButtonVariant"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}
/** Style a mat-button as a primary variant button */
declare class PrimaryButtonVariantDirective extends BaseButtonVariantDirective {
    /** Button variant */
    readonly variant = "primary";
    static ɵfac: i0.ɵɵFactoryDeclaration<PrimaryButtonVariantDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<PrimaryButtonVariantDirective, "button[mat-button][hraPrimaryButton], a[mat-button][hraPrimaryButton]", never, {}, {}, never, never, true, never>;
}
/** Style a mat-button as a secondary variant button */
declare class SecondaryButtonVariantDirective extends BaseButtonVariantDirective {
    /** Button variant */
    readonly variant = "secondary";
    static ɵfac: i0.ɵɵFactoryDeclaration<SecondaryButtonVariantDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SecondaryButtonVariantDirective, "button[mat-button][hraSecondaryButton], a[mat-button][hraSecondaryButton]", never, {}, {}, never, never, true, never>;
}

/**
 * HRA button component to be used in design system templates
 */
declare class ButtonComponent {
    /** Button label */
    readonly label: i0.InputSignal<string>;
    /** Button link */
    readonly href: i0.InputSignal<string>;
    /** Button version */
    readonly type: i0.InputSignal<"default" | "flat" | "cta" | "fab">;
    /** Button color variant */
    readonly variant: i0.InputSignal<ButtonVariant>;
    /** Button size */
    readonly size: i0.InputSignal<ButtonSize>;
    /** Whether button is disabled */
    readonly disabled: i0.InputSignal<boolean>;
    /** Icon to use in the button (can't be changed for CTA button) */
    readonly icon: i0.InputSignal<string | undefined>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ButtonComponent, "hra-button", never, { "label": { "alias": "label"; "required": true; "isSignal": true; }; "href": { "alias": "href"; "required": true; "isSignal": true; }; "type": { "alias": "type"; "required": false; "isSignal": true; }; "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "icon": { "alias": "icon"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

/** Content template definition for DataViewerComponent */
declare const ButtonDef: ContentTemplateDef<ButtonComponent>;

/** Turns a mat-button into a call-to-action styled button */
declare class CtaButtonDirective {
    static ɵfac: i0.ɵɵFactoryDeclaration<CtaButtonDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<CtaButtonDirective, "button[mat-button][hraCtaButton], a[mat-button][hraCtaButton]", never, {}, {}, never, never, true, never>;
}

export { ButtonDef, ButtonSchema, ButtonSizeDirective, ButtonVariantDirective, CtaButtonDirective, PrimaryButtonVariantDirective, SecondaryButtonVariantDirective };
export type { ButtonSize, ButtonVariant };
