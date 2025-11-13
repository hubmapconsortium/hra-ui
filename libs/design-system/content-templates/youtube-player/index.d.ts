import { ContentTemplateDef } from '@hra-ui/cdk/content-template';
import * as _angular_core from '@angular/core';
import { YouTubePlayer as YouTubePlayer$1 } from '@angular/youtube-player';
import * as z from 'zod';

/** YouTube Player wrapper component for Content Pages */
declare class HraYoutubePlayerComponent {
    /** The ID of the YouTube video to play*/
    readonly videoId: _angular_core.InputSignal<string>;
    /** Label for the video used in accessibility text */
    readonly label: _angular_core.InputSignal<string>;
    /** ViewChild reference to the YouTube player for programmatic control */
    readonly player: _angular_core.Signal<YouTubePlayer$1 | undefined>;
    /** Consent service to check if marketing cookies are enabled */
    private readonly consentService;
    /** Privacy preferences service to open modal */
    private readonly privacyPreferencesService;
    /** Whether marketing cookies are enabled */
    protected readonly hasCookiesEnabled: _angular_core.Signal<boolean>;
    /** Computed thumbnail URL */
    protected readonly thumbnailUrl: _angular_core.Signal<string>;
    /** YouTube video URL */
    protected readonly videoUrl: _angular_core.Signal<string>;
    /** Handle enable cookies button click - opens privacy preferences modal */
    protected onEnableCookiesClick(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<HraYoutubePlayerComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<HraYoutubePlayerComponent, "hra-youtube-player", never, { "videoId": { "alias": "videoId"; "required": true; "isSignal": true; }; "label": { "alias": "label"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
}

/** Content template definition for YoutubePlayer */
declare const YouTubePlayerDef: ContentTemplateDef<HraYoutubePlayerComponent>;

/** YouTube component data */
type YouTubePlayer = z.infer<typeof YouTubePlayerSchema>;
/** Schema for YouTube component */
declare const YouTubePlayerSchema: z.ZodObject<{
    classes: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>, z.ZodRecord<z.ZodString, z.ZodAny>]>>;
    styles: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodRecord<z.ZodString, z.ZodAny>]>>;
    controllers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
    }, z.core.$loose>>>;
    component: z.ZodLiteral<"YouTubePlayer">;
    videoId: z.ZodString;
    label: z.ZodString;
}, z.core.$strip>;

export { HraYoutubePlayerComponent, YouTubePlayerDef, YouTubePlayerSchema };
export type { YouTubePlayer };
