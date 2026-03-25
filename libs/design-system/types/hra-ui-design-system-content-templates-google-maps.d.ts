import * as _angular_platform_browser from '@angular/platform-browser';
import * as _angular_core from '@angular/core';
import { PrivacyPreferencesService } from '@hra-ui/design-system/privacy';
import { ContentTemplateDef } from '@hra-ui/cdk/content-template';
import * as z from 'zod';

/**
 * Google Maps wrapper component to load and display Google Maps.
 */
declare class GoogleMapsComponent {
    /** DOM sanitizer */
    private readonly sanitizer;
    /** Maps URL for the iframe */
    readonly url: _angular_core.InputSignal<string>;
    /** Trusted URL for the iframe */
    protected readonly mapsUrl: _angular_core.Signal<_angular_platform_browser.SafeResourceUrl>;
    /** External URL to open in new tab if cookies are disabled */
    readonly externalUrl: _angular_core.InputSignal<string>;
    /** Fallback image URL to show if cookies are disabled */
    readonly fallbackImageUrl: _angular_core.InputSignal<string>;
    /** Consent service */
    private readonly consentService;
    /** Privacy preferences service */
    protected readonly privacyPreferencesService: PrivacyPreferencesService;
    /** Flag indicating whether marketing cookies are enabled */
    protected readonly enabled: _angular_core.Signal<boolean>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GoogleMapsComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GoogleMapsComponent, "hra-google-maps", never, { "url": { "alias": "url"; "required": true; "isSignal": true; }; "externalUrl": { "alias": "externalUrl"; "required": true; "isSignal": true; }; "fallbackImageUrl": { "alias": "fallbackImageUrl"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}

/** Content template definition for GoogleMapsComponent */
declare const GoogleMapsDef: ContentTemplateDef<GoogleMapsComponent>;

/** Google Maps component data */
type GoogleMaps = z.infer<typeof GoogleMapsSchema>;
/** Schema for Google Maps component */
declare const GoogleMapsSchema: z.ZodObject<{
    classes: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>, z.ZodRecord<z.ZodString, z.ZodAny>]>>;
    styles: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodRecord<z.ZodString, z.ZodAny>]>>;
    controllers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
    }, z.core.$loose>>>;
    component: z.ZodLiteral<"GoogleMaps">;
    url: z.ZodString;
    externalUrl: z.ZodString;
    fallbackImageUrl: z.ZodString;
}, z.core.$strip>;

export { GoogleMapsComponent, GoogleMapsDef, GoogleMapsSchema };
export type { GoogleMaps };
