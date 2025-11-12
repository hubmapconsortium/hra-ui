import { HraCommonModule } from '@hra-ui/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, viewChild } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';
import { ConsentService } from '@hra-ui/common/analytics';
import { EventCategory } from '@hra-ui/common/analytics/events';
import { PrivacyPreferencesService } from '@hra-ui/design-system/privacy';

/** YouTube Player wrapper component for Content Pages */
@Component({
  selector: 'hra-youtube-player',
  imports: [HraCommonModule, YouTubePlayer],
  templateUrl: './youtube-player.component.html',
  styleUrl: './youtube-player.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HraYoutubePlayerComponent {
  /** The ID of the YouTube video to play*/
  readonly videoId = input.required<string>();

  /** Label for the video used in accessibility text */
  readonly label = input.required<string>();

  /** ViewChild reference to the YouTube player for programmatic control */
  readonly player = viewChild<YouTubePlayer>('player');

  /** Consent service to check if marketing cookies are enabled */
  private readonly consentService = inject(ConsentService);

  /** Privacy preferences service to open modal */
  private readonly privacyPreferencesService = inject(PrivacyPreferencesService);

  /** Whether marketing cookies are enabled */
  protected readonly hasCookiesEnabled = computed(() => this.consentService.isCategoryEnabled(EventCategory.Marketing));

  /** Computed thumbnail URL */
  protected readonly thumbnailUrl = computed(() => `https://img.youtube.com/vi/${this.videoId()}/maxresdefault.jpg`);

  /** YouTube video URL */
  protected readonly videoUrl = computed(() => `https://www.youtube.com/watch?v=${this.videoId()}`);

  /** Handle enable cookies button click - opens privacy preferences modal */
  protected onEnableCookiesClick(): void {
    this.privacyPreferencesService.openPrivacyPreferences('consent');
  }
}
