import * as _angular_core from '@angular/core';
import * as z from 'zod';

/**
 * Content Page Component
 */
declare class ContentPageComponent {
    /** input data for content page */
    readonly data: _angular_core.InputSignal<{
        $schema: string;
        title: string;
        subtitle: string;
        content: {
            [x: string]: unknown;
            component: string;
            classes?: string | Record<string, any> | string[] | undefined;
            styles?: string | Record<string, any> | undefined;
            controllers?: {
                [x: string]: unknown;
                id: string;
            }[] | undefined;
        } | {
            [x: string]: unknown;
            component: string;
            classes?: string | Record<string, any> | string[] | undefined;
            styles?: string | Record<string, any> | undefined;
            controllers?: {
                [x: string]: unknown;
                id: string;
            }[] | undefined;
        }[];
        icons?: string | {
            svgIcon?: string | undefined;
            fontIcon?: string | undefined;
            fontSet?: string | undefined;
            inline?: boolean | undefined;
        } | (string | {
            svgIcon?: string | undefined;
            fontIcon?: string | undefined;
            fontSet?: string | undefined;
            inline?: boolean | undefined;
        })[] | undefined;
        action?: {
            label: string;
            url: string;
        } | undefined;
        headerContent?: {
            [x: string]: unknown;
            component: string;
            classes?: string | Record<string, any> | string[] | undefined;
            styles?: string | Record<string, any> | undefined;
            controllers?: {
                [x: string]: unknown;
                id: string;
            }[] | undefined;
        } | {
            [x: string]: unknown;
            component: string;
            classes?: string | Record<string, any> | string[] | undefined;
            styles?: string | Record<string, any> | undefined;
            controllers?: {
                [x: string]: unknown;
                id: string;
            }[] | undefined;
        }[] | undefined;
    }>;
    /** header content data */
    protected readonly headerContent: _angular_core.Signal<{
        [x: string]: unknown;
        component: string;
        classes?: string | Record<string, any> | string[] | undefined;
        styles?: string | Record<string, any> | undefined;
        controllers?: {
            [x: string]: unknown;
            id: string;
        }[] | undefined;
    }[]>;
    /** content data */
    protected readonly content: _angular_core.Signal<{
        [x: string]: unknown;
        component: string;
        classes?: string | Record<string, any> | string[] | undefined;
        styles?: string | Record<string, any> | undefined;
        controllers?: {
            [x: string]: unknown;
            id: string;
        }[] | undefined;
    }[]>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<ContentPageComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<ContentPageComponent, "hra-content-page", never, { "data": { "alias": "data"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}

/** Content page type */
type ContentPageData = z.infer<typeof ContentPageDataSchema>;
/** Schema for content page data */
declare const ContentPageDataSchema: z.ZodObject<{
    $schema: z.ZodString;
    title: z.ZodString;
    subtitle: z.ZodString;
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
    action: z.ZodOptional<z.ZodObject<{
        label: z.ZodString;
        url: z.ZodString;
    }, z.core.$strip>>;
    headerContent: z.ZodOptional<z.ZodUnion<readonly [z.ZodType<{
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
    content: z.ZodUnion<readonly [z.ZodType<{
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
    }, unknown>>>]>;
}, z.core.$strip>;

export { ContentPageComponent, ContentPageDataSchema };
export type { ContentPageData };
