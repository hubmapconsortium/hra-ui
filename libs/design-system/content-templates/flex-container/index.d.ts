import * as _angular_core from '@angular/core';
import { AnyContentTemplateDef } from '@hra-ui/cdk/content-template';
import { z } from 'zod';

/**
 * Layout component that allows for flexible arrangement of child elements.
 */
declare class FlexContainerComponent {
    /** Row gap between items */
    readonly rowGap: _angular_core.InputSignal<string | undefined>;
    /** Column gap between items */
    readonly columnGap: _angular_core.InputSignal<string | undefined>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<FlexContainerComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<FlexContainerComponent, "hra-flex-container", never, { "rowGap": { "alias": "rowGap"; "required": false; "isSignal": true; }; "columnGap": { "alias": "columnGap"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}

/** FlexContainer content template definition */
declare const FlexContainerDef: AnyContentTemplateDef;

/** Schema structure of a flex container */
declare const FlexContainerSchema: z.ZodObject<{
    classes: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>, z.ZodRecord<z.ZodString, z.ZodAny>]>>;
    styles: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodRecord<z.ZodString, z.ZodAny>]>>;
    controllers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
    }, z.core.$loose>>>;
    component: z.ZodLiteral<"FlexContainer">;
    rowGap: z.ZodOptional<z.ZodString>;
    columnGap: z.ZodOptional<z.ZodString>;
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

export { FlexContainerComponent, FlexContainerDef, FlexContainerSchema };
