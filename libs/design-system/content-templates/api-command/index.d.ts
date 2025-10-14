import { ContentTemplateDef } from '@hra-ui/cdk/content-template';
import * as _angular_core from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { z } from 'zod';

/** Displays a card for users to copy and access API information */
declare class ApiCommandComponent {
    /** Service for copying text to clipboard */
    readonly clipboard: Clipboard;
    /** The request url */
    readonly request: _angular_core.InputSignal<string>;
    /** API method to use */
    readonly method: _angular_core.InputSignal<string>;
    /** Right button info */
    readonly rightButton: _angular_core.InputSignal<{
        label: string;
        icon?: string | undefined;
        url?: string | undefined;
    }>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<ApiCommandComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<ApiCommandComponent, "hra-api-command", never, { "request": { "alias": "request"; "required": true; "isSignal": true; }; "method": { "alias": "method"; "required": true; "isSignal": true; }; "rightButton": { "alias": "rightButton"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}

/** Content template definition for ApiCommandComponent */
declare const ApiCommandDef: ContentTemplateDef<ApiCommandComponent>;

/** API command type */
type ApiCommand = z.infer<typeof ApiCommandSchema>;
/** Schema for api command */
declare const ApiCommandSchema: z.ZodObject<{
    classes: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>, z.ZodRecord<z.ZodString, z.ZodAny>]>>;
    styles: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodRecord<z.ZodString, z.ZodAny>]>>;
    controllers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
    }, z.core.$loose>>>;
    component: z.ZodLiteral<"ApiCommand">;
    request: z.ZodString;
    method: z.ZodEnum<{
        GET: "GET";
        POST: "POST";
    }>;
    rightButton: z.ZodObject<{
        label: z.ZodString;
        icon: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;

export { ApiCommandComponent, ApiCommandDef, ApiCommandSchema };
export type { ApiCommand };
