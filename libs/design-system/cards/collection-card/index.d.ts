import * as _angular_core from '@angular/core';
import { ContentTemplateDef } from '@hra-ui/cdk/content-template';
import * as z from 'zod';

/** Helper component for projecting card actions into the right location */
declare class CollectionCardActionComponent {
    /** Whether the actions should be put on the left or right side of the card */
    readonly alignment: _angular_core.InputSignal<"left" | "right" | undefined>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<CollectionCardActionComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<CollectionCardActionComponent, "hra-collection-card-action", never, { "alignment": { "alias": "alignment"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}
/** Design system collection card */
declare class CollectionCardComponent {
    /** Card title */
    readonly tagline: _angular_core.InputSignal<string>;
    /** Image url shown in the card */
    readonly image: _angular_core.InputSignal<string | undefined>;
    /** Icons shown for collection cards */
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
    /** Chips/tags shown for collection cards */
    readonly chips: _angular_core.InputSignal<string[]>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<CollectionCardComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<CollectionCardComponent, "hra-collection-card", never, { "tagline": { "alias": "tagline"; "required": true; "isSignal": true; }; "image": { "alias": "image"; "required": false; "isSignal": true; }; "icons": { "alias": "icons"; "required": false; "isSignal": true; }; "chips": { "alias": "chips"; "required": false; "isSignal": true; }; }, {}, never, ["*", "hra-collection-card-action:not([alignment='right'])", "hra-collection-card-action[alignment='right']"], true, never>;
}

/** Content template definition for collection card */
declare const CollectionCardDef: ContentTemplateDef<CollectionCardComponent>;

/** Content template collection card data */
type CollectionCard = z.infer<typeof CollectionCardSchema>;
/** Schema for content template collection card data */
declare const CollectionCardSchema: z.ZodObject<{
    classes: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>, z.ZodRecord<z.ZodString, z.ZodAny>]>>;
    styles: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodRecord<z.ZodString, z.ZodAny>]>>;
    controllers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
    }, z.core.$loose>>>;
    component: z.ZodLiteral<"CollectionCard">;
    tagline: z.ZodString;
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
    chips: z.ZodOptional<z.ZodArray<z.ZodString>>;
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

export { CollectionCardActionComponent, CollectionCardComponent, CollectionCardDef, CollectionCardSchema };
export type { CollectionCard };
