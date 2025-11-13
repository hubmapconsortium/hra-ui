import * as _angular_core from '@angular/core';
import * as z from 'zod';
import { IconButtonSize, IconButtonVariant } from '@hra-ui/design-system/buttons/icon-button';

/**
 * Social media buttons for HRA apps
 */
declare class SocialMediaButtonComponent {
    /** Social media to display */
    readonly id: _angular_core.InputSignal<string & z.$brand<"SocialMediaId">>;
    /** Button size */
    readonly size: _angular_core.InputSignal<IconButtonSize>;
    /** Button variant */
    readonly variant: _angular_core.InputSignal<IconButtonVariant>;
    /** Social media button data */
    protected readonly data: _angular_core.Signal<{
        id: string & z.$brand<"SocialMediaId">;
        label: string;
        icon: string;
        link: string;
        isFontIcon?: boolean | undefined;
    }>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<SocialMediaButtonComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<SocialMediaButtonComponent, "hra-social-media-button", never, { "id": { "alias": "id"; "required": true; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "variant": { "alias": "variant"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

/** All available social ids */
declare const SOCIAL_IDS: (string & z.$brand<"SocialMediaId">)[];

/** Social media id */
type SocialMediaId = SocialMedia['id'];
/** Social media item */
type SocialMedia = z.infer<typeof SocialMediaSchema>;
/** Schema for social media item */
declare const SocialMediaSchema: z.ZodObject<{
    id: z.core.$ZodBranded<z.ZodString, "SocialMediaId">;
    label: z.ZodString;
    icon: z.ZodString;
    isFontIcon: z.ZodOptional<z.ZodBoolean>;
    link: z.ZodString;
}, z.core.$strip>;

export { SOCIAL_IDS, SocialMediaButtonComponent };
export type { SocialMediaId };
