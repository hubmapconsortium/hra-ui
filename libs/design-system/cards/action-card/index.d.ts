import * as _angular_core from '@angular/core';
import { ContentTemplateDef } from '@hra-ui/cdk/content-template';
import { z } from 'zod';

/** Helper component for projecting card actions into the right location */
declare class ActionCardActionComponent {
    /** Whether the actions should be put on the left or right side of the card */
    readonly alignment: _angular_core.InputSignal<"left" | "right" | undefined>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<ActionCardActionComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<ActionCardActionComponent, "hra-action-card-action", never, { "alignment": { "alias": "alignment"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}
/**
 * Design system action card
 * The card consists of an image on top (or icons for the `outlined-with-icons` variant)
 * followed by a title and content and optionally actions
 */
declare class ActionCardComponent {
    /** Card layout variant */
    readonly variant: _angular_core.InputSignal<"elevated" | "flat" | "outlined" | "outlined-with-icons">;
    /** Title */
    readonly tagline: _angular_core.InputSignal<string>;
    /** Smaller title show above the primary title for `elevated` cards */
    readonly subtagline: _angular_core.InputSignal<string | undefined>;
    /** Image url show on top except for `outlined-with-icons` cards */
    readonly image: _angular_core.InputSignal<string | undefined>;
    /** Icons shown for `outlined-with-icons` cards */
    readonly icons: _angular_core.InputSignalWithTransform<{
        component: "Icon";
        classes?: string | string[] | Record<string, any> | undefined;
        styles?: string | Record<string, any> | undefined;
        controllers?: {
            [x: string]: unknown;
            id: string;
        }[] | undefined;
        svgIcon?: string | undefined;
        fontIcon?: string | undefined;
        fontSet?: string | undefined;
        inline?: boolean | undefined;
    }[], string | {
        svgIcon?: string | undefined;
        fontIcon?: string | undefined;
        fontSet?: string | undefined;
        inline?: boolean | undefined;
    } | (string | {
        svgIcon?: string | undefined;
        fontIcon?: string | undefined;
        fontSet?: string | undefined;
        inline?: boolean | undefined;
    })[] | undefined>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<ActionCardComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<ActionCardComponent, "hra-action-card", never, { "variant": { "alias": "variant"; "required": true; "isSignal": true; }; "tagline": { "alias": "tagline"; "required": true; "isSignal": true; }; "subtagline": { "alias": "subtagline"; "required": false; "isSignal": true; }; "image": { "alias": "image"; "required": false; "isSignal": true; }; "icons": { "alias": "icons"; "required": false; "isSignal": true; }; }, {}, never, ["*", "hra-action-card-action:not([alignment='right'])", "hra-action-card-action[alignment='right']"], true, never>;
}

/** Content template definition for action card */
declare const ActionCardDef: ContentTemplateDef<ActionCardComponent>;

/** Action card variants */
type ActionCardVariant = z.infer<typeof ActionCardVariantSchema>;
/** Schema for action card variants */
declare const ActionCardVariantSchema: z.ZodEnum<{
    elevated: "elevated";
    flat: "flat";
    outlined: "outlined";
    "outlined-with-icons": "outlined-with-icons";
}>;
/** Content template action card data */
type ActionCard = z.infer<typeof ActionCardSchema>;
/** Schema for content template action card data */
declare const ActionCardSchema: z.ZodObject<{
    classes: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>, z.ZodRecord<z.ZodString, z.ZodAny>]>>;
    styles: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodRecord<z.ZodString, z.ZodAny>]>>;
    controllers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
    }, z.core.$loose>>>;
    component: z.ZodLiteral<"ActionCard">;
    variant: z.ZodEnum<{
        elevated: "elevated";
        flat: "flat";
        outlined: "outlined";
        "outlined-with-icons": "outlined-with-icons";
    }>;
    tagline: z.ZodString;
    subtagline: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodString>;
    icons: z.ZodOptional<z.ZodUnion<readonly [z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
        svgIcon: z.ZodOptional<z.ZodString>;
        fontIcon: z.ZodOptional<z.ZodString>;
        fontSet: z.ZodOptional<z.ZodString>;
        inline: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>]>, z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
        svgIcon: z.ZodOptional<z.ZodString>;
        fontIcon: z.ZodOptional<z.ZodString>;
        fontSet: z.ZodOptional<z.ZodString>;
        inline: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>]>>]>>;
    content: z.ZodOptional<z.ZodUnion<readonly [z.ZodType<{
        [x: string]: unknown;
        component: string;
        classes?: string | Record<string, any> | string[] | undefined;
        styles?: string | Record<string, any> | undefined;
        controllers?: {
            [x: string]: unknown;
            id: string;
        }[] | undefined;
    }, unknown, z.core.$ZodTypeInternals<{
        [x: string]: unknown;
        component: string;
        classes?: string | Record<string, any> | string[] | undefined;
        styles?: string | Record<string, any> | undefined;
        controllers?: {
            [x: string]: unknown;
            id: string;
        }[] | undefined;
    }, unknown>>, z.ZodArray<z.ZodType<{
        [x: string]: unknown;
        component: string;
        classes?: string | Record<string, any> | string[] | undefined;
        styles?: string | Record<string, any> | undefined;
        controllers?: {
            [x: string]: unknown;
            id: string;
        }[] | undefined;
    }, unknown, z.core.$ZodTypeInternals<{
        [x: string]: unknown;
        component: string;
        classes?: string | Record<string, any> | string[] | undefined;
        styles?: string | Record<string, any> | undefined;
        controllers?: {
            [x: string]: unknown;
            id: string;
        }[] | undefined;
    }, unknown>>>]>>;
    actionsLeft: z.ZodOptional<z.ZodUnion<readonly [z.ZodType<{
        [x: string]: unknown;
        component: string;
        classes?: string | Record<string, any> | string[] | undefined;
        styles?: string | Record<string, any> | undefined;
        controllers?: {
            [x: string]: unknown;
            id: string;
        }[] | undefined;
    }, unknown, z.core.$ZodTypeInternals<{
        [x: string]: unknown;
        component: string;
        classes?: string | Record<string, any> | string[] | undefined;
        styles?: string | Record<string, any> | undefined;
        controllers?: {
            [x: string]: unknown;
            id: string;
        }[] | undefined;
    }, unknown>>, z.ZodArray<z.ZodType<{
        [x: string]: unknown;
        component: string;
        classes?: string | Record<string, any> | string[] | undefined;
        styles?: string | Record<string, any> | undefined;
        controllers?: {
            [x: string]: unknown;
            id: string;
        }[] | undefined;
    }, unknown, z.core.$ZodTypeInternals<{
        [x: string]: unknown;
        component: string;
        classes?: string | Record<string, any> | string[] | undefined;
        styles?: string | Record<string, any> | undefined;
        controllers?: {
            [x: string]: unknown;
            id: string;
        }[] | undefined;
    }, unknown>>>]>>;
    actionsRight: z.ZodOptional<z.ZodUnion<readonly [z.ZodType<{
        [x: string]: unknown;
        component: string;
        classes?: string | Record<string, any> | string[] | undefined;
        styles?: string | Record<string, any> | undefined;
        controllers?: {
            [x: string]: unknown;
            id: string;
        }[] | undefined;
    }, unknown, z.core.$ZodTypeInternals<{
        [x: string]: unknown;
        component: string;
        classes?: string | Record<string, any> | string[] | undefined;
        styles?: string | Record<string, any> | undefined;
        controllers?: {
            [x: string]: unknown;
            id: string;
        }[] | undefined;
    }, unknown>>, z.ZodArray<z.ZodType<{
        [x: string]: unknown;
        component: string;
        classes?: string | Record<string, any> | string[] | undefined;
        styles?: string | Record<string, any> | undefined;
        controllers?: {
            [x: string]: unknown;
            id: string;
        }[] | undefined;
    }, unknown, z.core.$ZodTypeInternals<{
        [x: string]: unknown;
        component: string;
        classes?: string | Record<string, any> | string[] | undefined;
        styles?: string | Record<string, any> | undefined;
        controllers?: {
            [x: string]: unknown;
            id: string;
        }[] | undefined;
    }, unknown>>>]>>;
}, z.core.$strip>;

export { ActionCardActionComponent, ActionCardComponent, ActionCardDef, ActionCardSchema, ActionCardVariantSchema };
export type { ActionCard, ActionCardVariant };
