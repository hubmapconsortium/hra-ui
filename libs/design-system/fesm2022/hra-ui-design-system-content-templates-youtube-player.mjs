import { HraCommonModule } from '@hra-ui/common';
import * as i0 from '@angular/core';
import { input, viewChild, inject, computed, ChangeDetectionStrategy, Component } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';
import * as i1 from '@hra-ui/common/analytics';
import { ConsentService } from '@hra-ui/common/analytics';
import { EventCategory } from '@hra-ui/common/analytics/events';
import { PrivacyPreferencesService } from '@hra-ui/design-system/privacy';
import { ContentTemplateSchema } from '@hra-ui/cdk/content-template';
import * as z from 'zod';

/** YouTube Player wrapper component for Content Pages */
class HraYoutubePlayerComponent {
    /** The ID of the YouTube video to play*/
    videoId = input.required(...(ngDevMode ? [{ debugName: "videoId" }] : []));
    /** Label for the video used in accessibility text */
    label = input.required(...(ngDevMode ? [{ debugName: "label" }] : []));
    /** ViewChild reference to the YouTube player for programmatic control */
    player = viewChild('player', ...(ngDevMode ? [{ debugName: "player" }] : []));
    /** Consent service to check if marketing cookies are enabled */
    consentService = inject(ConsentService);
    /** Privacy preferences service to open modal */
    privacyPreferencesService = inject(PrivacyPreferencesService);
    /** Whether marketing cookies are enabled */
    hasCookiesEnabled = computed(() => this.consentService.isCategoryEnabled(EventCategory.Marketing), ...(ngDevMode ? [{ debugName: "hasCookiesEnabled" }] : []));
    /** Computed thumbnail URL */
    thumbnailUrl = computed(() => `https://img.youtube.com/vi/${this.videoId()}/sddefault.jpg`, ...(ngDevMode ? [{ debugName: "thumbnailUrl" }] : []));
    /** YouTube video URL */
    videoUrl = computed(() => `https://www.youtube.com/watch?v=${this.videoId()}`, ...(ngDevMode ? [{ debugName: "videoUrl" }] : []));
    /** Handle enable cookies button click - opens privacy preferences modal */
    onEnableCookiesClick() {
        this.privacyPreferencesService.openPrivacyPreferences('consent');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: HraYoutubePlayerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.11", type: HraYoutubePlayerComponent, isStandalone: true, selector: "hra-youtube-player", inputs: { videoId: { classPropertyName: "videoId", publicName: "videoId", isSignal: true, isRequired: true, transformFunction: null }, label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: true, transformFunction: null } }, viewQueries: [{ propertyName: "player", first: true, predicate: ["player"], descendants: true, isSignal: true }], ngImport: i0, template: "@if (hasCookiesEnabled()) {\n  <youtube-player\n    hraFeature=\"youtube-player\"\n    hraClickEvent\n    [videoId]=\"videoId()\"\n    [playerVars]=\"{ rel: 0, showinfo: 0 }\"\n    [disableCookies]=\"true\"\n    #player\n  />\n} @else {\n  <div class=\"youtube-thumbnail-container\" hraFeature=\"youtube-thumbnail\">\n    <a target=\"_blank\" rel=\"noopener noreferrer\" hraFeature=\"watch-on-youtube\" hraClickEvent [attr.href]=\"videoUrl()\">\n      <img class=\"thumbnail-image\" [attr.src]=\"thumbnailUrl()\" [attr.alt]=\"`YouTube video thumbnail for ${label()}`\" />\n    </a>\n    <div class=\"enable-cookies-message\">\n      <button hraFeature=\"enable-cookies\" hraClickEvent class=\"enable-cookies-button\" (click)=\"onEnableCookiesClick()\">\n        Enable cookies\n      </button>\n      to watch videos\n    </div>\n  </div>\n}\n", styles: [":host{display:block;position:relative}:host youtube-player{display:block}:host ::ng-deep youtube-player>*{width:100%!important;aspect-ratio:16/9!important;height:unset!important}:host .thumbnail-image{height:100%;aspect-ratio:16/9;object-fit:cover;display:block}:host .enable-cookies-message{font:var(--mat-sys-label-small);letter-spacing:var(--mat-sys-label-small-tracking);color:var(--mat-sys-primary);margin-top:.5rem}:host .enable-cookies-button{background:none;border:none;padding:0;cursor:pointer;color:var(--mat-sys-tertiary);text-decoration:underline}\n"], dependencies: [{ kind: "ngmodule", type: HraCommonModule }, { kind: "directive", type: i1.ClickEventDirective, selector: "[hraClickEvent]", inputs: ["hraClickEvent", "hraClickEventTriggerOn", "hraClickEventDisabled"], exportAs: ["hraClickEvent"] }, { kind: "directive", type: i1.FeatureDirective, selector: "[hraFeature]", inputs: ["hraFeature"] }, { kind: "component", type: YouTubePlayer, selector: "youtube-player", inputs: ["videoId", "height", "width", "startSeconds", "endSeconds", "suggestedQuality", "playerVars", "disableCookies", "loadApi", "disablePlaceholder", "showBeforeIframeApiLoads", "placeholderButtonLabel", "placeholderImageQuality"], outputs: ["ready", "stateChange", "error", "apiChange", "playbackQualityChange", "playbackRateChange"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.11", ngImport: i0, type: HraYoutubePlayerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'hra-youtube-player', imports: [HraCommonModule, YouTubePlayer], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (hasCookiesEnabled()) {\n  <youtube-player\n    hraFeature=\"youtube-player\"\n    hraClickEvent\n    [videoId]=\"videoId()\"\n    [playerVars]=\"{ rel: 0, showinfo: 0 }\"\n    [disableCookies]=\"true\"\n    #player\n  />\n} @else {\n  <div class=\"youtube-thumbnail-container\" hraFeature=\"youtube-thumbnail\">\n    <a target=\"_blank\" rel=\"noopener noreferrer\" hraFeature=\"watch-on-youtube\" hraClickEvent [attr.href]=\"videoUrl()\">\n      <img class=\"thumbnail-image\" [attr.src]=\"thumbnailUrl()\" [attr.alt]=\"`YouTube video thumbnail for ${label()}`\" />\n    </a>\n    <div class=\"enable-cookies-message\">\n      <button hraFeature=\"enable-cookies\" hraClickEvent class=\"enable-cookies-button\" (click)=\"onEnableCookiesClick()\">\n        Enable cookies\n      </button>\n      to watch videos\n    </div>\n  </div>\n}\n", styles: [":host{display:block;position:relative}:host youtube-player{display:block}:host ::ng-deep youtube-player>*{width:100%!important;aspect-ratio:16/9!important;height:unset!important}:host .thumbnail-image{height:100%;aspect-ratio:16/9;object-fit:cover;display:block}:host .enable-cookies-message{font:var(--mat-sys-label-small);letter-spacing:var(--mat-sys-label-small-tracking);color:var(--mat-sys-primary);margin-top:.5rem}:host .enable-cookies-button{background:none;border:none;padding:0;cursor:pointer;color:var(--mat-sys-tertiary);text-decoration:underline}\n"] }]
        }], propDecorators: { videoId: [{ type: i0.Input, args: [{ isSignal: true, alias: "videoId", required: true }] }], label: [{ type: i0.Input, args: [{ isSignal: true, alias: "label", required: true }] }], player: [{ type: i0.ViewChild, args: ['player', { isSignal: true }] }] } });

/** Schema for YouTube component */
const YouTubePlayerSchema = ContentTemplateSchema.extend({
    component: z.literal('YouTubePlayer'),
    videoId: z.string(),
    label: z.string(),
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
