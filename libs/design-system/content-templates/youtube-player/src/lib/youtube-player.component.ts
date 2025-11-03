import { CommonModule } from '@angular/common';
import { HraCommonModule } from '@hra-ui/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, viewChild } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';
import { ConsentService } from '@hra-ui/common/analytics';
import { EventCategory } from '@hra-ui/common/analytics/events';
import { PrivacyPreferencesService } from '@hra-ui/design-system/privacy';

/** YouTube Player wrapper component for Content Pages */
@Component({
  selector: 'hra-youtube-player',
  imports: [CommonModule, HraCommonModule, YouTubePlayer],
  templateUrl: './youtube-player.component.html',
  styleUrl: './youtube-player.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HraYoutubePlayerComponent {
  /** The ID of the YouTube video to play*/
  readonly videoId = input.required<string>();

  /** Optional player variables to pass to YouTube player */
  readonly playerVars = input<YT.PlayerVars>();

  /** ViewChild reference to the YouTube player for programmatic control */
  private readonly player = viewChild<YouTubePlayer>('player');

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

  /** Handle enable cookies link click - opens privacy preferences modal */
  protected onEnableCookiesClick(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.privacyPreferencesService.openPrivacyPreferences('consent');
  }

  /**
   * Seeks the YouTube player to a specific time in seconds.
   * @param seconds The target time in seconds to seek to.
   * @param allowSeekAhead Whether to make a new request to the server if needed.
   */
  seekTo(seconds: number, allowSeekAhead = true): void {
    this.player()?.seekTo(seconds, allowSeekAhead);
  }

  /**
   * Pauses the currently playing video.
   */
  pauseVideo(): void {
    this.player()?.pauseVideo();
  }

  /**
   * Plays the currently cued/loaded video.
   */
  playVideo(): void {
    this.player()?.playVideo();
  }
}
