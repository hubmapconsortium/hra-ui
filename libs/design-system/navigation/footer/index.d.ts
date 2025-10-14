import * as _angular_core from '@angular/core';
import * as zod from 'zod';
import { z } from 'zod';

/**
 * Global footer component
 */
declare class FooterComponent {
    /** List of funders to show */
    readonly funders: _angular_core.InputSignal<(string & zod.$brand<"FunderId">)[]>;
    /** List of social media link to show */
    readonly socials: _angular_core.InputSignal<(string & zod.$brand<"SocialMediaId">)[]>;
    /** inject Privacy Preference Service */
    private readonly privacyPreferences;
    /** Open Privacy Preferences Modal */
    openPrivacyPreferences(event: Event): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<FooterComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<FooterComponent, "hra-footer", never, { "funders": { "alias": "funders"; "required": false; "isSignal": true; }; "socials": { "alias": "socials"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

/** All available funder ids */
declare const FUNDER_IDS: (string & zod.$brand<"FunderId">)[];

/** Data id of a funder */
type FunderId = Funder['id'];
/** A funder item */
type Funder = z.infer<typeof FunderSchema>;
/** Schema for a funder item */
declare const FunderSchema: z.ZodObject<{
    id: z.core.$ZodBranded<z.ZodString, "FunderId">;
    name: z.ZodString;
    link: z.ZodString;
    image: z.ZodString;
}, z.core.$strip>;

export { FUNDER_IDS, FooterComponent };
export type { FunderId };
