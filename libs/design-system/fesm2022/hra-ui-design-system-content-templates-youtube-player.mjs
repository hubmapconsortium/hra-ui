import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { input, ChangeDetectionStrategy, Component } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';
import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import { z } from 'zod';

/** YouTube Player wrapper component for Content Pages */
class HraYoutubePlayerComponent {
    /** The ID of the YouTube video to play*/
    videoId = input.required(...(ngDevMode ? [{ debugName: "videoId" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: HraYoutubePlayerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "20.3.9", type: HraYoutubePlayerComponent, isStandalone: true, selector: "hra-youtube-player", inputs: { videoId: { classPropertyName: "videoId", publicName: "videoId", isSignal: true, isRequired: true, transformFunction: null } }, ngImport: i0, template: `<youtube-player [videoId]="videoId()" [disableCookies]="true" />`, isInline: true, styles: [":host{display:block;position:relative}:host youtube-player{display:block}:host ::ng-deep youtube-player>*{width:100%!important;aspect-ratio:16/9!important;height:unset!important}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: YouTubePlayer, selector: "youtube-player", inputs: ["videoId", "height", "width", "startSeconds", "endSeconds", "suggestedQuality", "playerVars", "disableCookies", "loadApi", "disablePlaceholder", "showBeforeIframeApiLoads", "placeholderButtonLabel", "placeholderImageQuality"], outputs: ["ready", "stateChange", "error", "apiChange", "playbackQualityChange", "playbackRateChange"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.9", ngImport: i0, type: HraYoutubePlayerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-youtube-player', imports: [CommonModule, YouTubePlayer], template: `<youtube-player [videoId]="videoId()" [disableCookies]="true" />`, changeDetection: ChangeDetectionStrategy.OnPush, styles: [":host{display:block;position:relative}:host youtube-player{display:block}:host ::ng-deep youtube-player>*{width:100%!important;aspect-ratio:16/9!important;height:unset!important}\n"] }]
        }], propDecorators: { videoId: [{ type: i0.Input, args: [{ isSignal: true, alias: "videoId", required: true }] }] } });

/** Schema for YouTube component */
const YouTubePlayerSchema = ContentTemplateSchema.extend({
    component: z.literal('YouTubePlayer'),
    videoId: z.string(),
});

/** Content template definition for YoutubePlayer */
const YouTubePlayerDef = {
    component: HraYoutubePlayerComponent,
    spec: YouTubePlayerSchema,
};

/**
 * Generated bundle index. Do not edit.
 */

export { HraYoutubePlayerComponent, YouTubePlayerDef, YouTubePlayerSchema };
//# sourceMappingURL=hra-ui-design-system-content-templates-youtube-player.mjs.map
