import * as _angular_core from '@angular/core';
import { ContentTemplateDef } from '@hra-ui/cdk/content-template';
import { z } from 'zod';

/**
 * Profile Card for displaying user information and relevant links
 */
declare class ProfileCardComponent {
    /** Field for profile picture URL */
    readonly pictureUrl: _angular_core.InputSignal<string>;
    /** Field for profile name */
    readonly name: _angular_core.InputSignal<string>;
    /** Field for description */
    readonly description: _angular_core.InputSignal<string>;
    /** Whether to center card content */
    readonly centerContent: _angular_core.InputSignalWithTransform<boolean, unknown>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<ProfileCardComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<ProfileCardComponent, "hra-profile-card", never, { "pictureUrl": { "alias": "pictureUrl"; "required": true; "isSignal": true; }; "name": { "alias": "name"; "required": true; "isSignal": true; }; "description": { "alias": "description"; "required": true; "isSignal": true; }; "centerContent": { "alias": "centerContent"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}

/** ProfileCard content template definition */
declare const ProfileCardDef: ContentTemplateDef<ProfileCardComponent>;

/** Type for profile card */
type ProfileCard = z.infer<typeof ProfileCardSchema>;
/** Profile card schema */
declare const ProfileCardSchema: z.ZodObject<{
    classes: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>, z.ZodRecord<z.ZodString, z.ZodAny>]>>;
    styles: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodRecord<z.ZodString, z.ZodAny>]>>;
    controllers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
    }, z.core.$loose>>>;
    component: z.ZodLiteral<"ProfileCard">;
    name: z.ZodString;
    description: z.ZodString;
    pictureUrl: z.ZodString;
    centerContent: z.ZodOptional<z.ZodBoolean>;
    actions: z.ZodOptional<z.ZodUnion<readonly [z.ZodType<{
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

export { ProfileCardComponent, ProfileCardDef, ProfileCardSchema };
export type { ProfileCard };
