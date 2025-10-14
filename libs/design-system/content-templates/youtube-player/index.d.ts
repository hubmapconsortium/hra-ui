import { ContentTemplateDef } from '@hra-ui/cdk/content-template';
import * as i0 from '@angular/core';
import { z } from 'zod';

/** YouTube Player wrapper component for Content Pages */
declare class HraYoutubePlayerComponent {
    /** The ID of the YouTube video to play*/
    protected readonly videoId: i0.InputSignal<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<HraYoutubePlayerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<HraYoutubePlayerComponent, "hra-youtube-player", never, { "videoId": { "alias": "videoId"; "required": true; "isSignal": true; }; }, {}, never, never, true, never>;
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
}, z.core.$strip>;

export { HraYoutubePlayerComponent, YouTubePlayerDef, YouTubePlayerSchema };
export type { YouTubePlayer };
