import * as i0 from '@angular/core';
import { AnyContentTemplateDef } from '@hra-ui/cdk/content-template';
import { z } from 'zod';

/**
 * Layout component that allows for grid arrangement of child elements.
 */
declare class GridContainerComponent {
    /** Minimum item width */
    readonly itemMinWidth: i0.InputSignal<string | undefined>;
    static ɵfac: i0.ɵɵFactoryDeclaration<GridContainerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<GridContainerComponent, "hra-grid-container", never, { "itemMinWidth": { "alias": "itemMinWidth"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}

/** GridContainer content template definition */
declare const GridContainerDef: AnyContentTemplateDef;

/** Schema structure of a grid container */
declare const GridContainerSchema: z.ZodObject<{
    classes: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>, z.ZodRecord<z.ZodString, z.ZodAny>]>>;
    styles: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodRecord<z.ZodString, z.ZodAny>]>>;
    controllers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
    }, z.core.$loose>>>;
    component: z.ZodLiteral<"GridContainer">;
    itemMinWidth: z.ZodOptional<z.ZodString>;
    content: z.ZodArray<z.ZodType<{
        [x: string]: unknown;
        component: string;
        classes?: string | string[] | Record<string, any> | undefined;
        styles?: string | Record<string, any> | undefined;
        controllers?: {
            [x: string]: unknown;
            id: string;
        }[] | undefined;
    }, unknown, z.core.$ZodTypeInternals<{
        [x: string]: unknown;
        component: string;
        classes?: string | string[] | Record<string, any> | undefined;
        styles?: string | Record<string, any> | undefined;
        controllers?: {
            [x: string]: unknown;
            id: string;
        }[] | undefined;
    }, unknown>>>;
}, z.core.$strip>;

export { GridContainerComponent, GridContainerDef, GridContainerSchema };
