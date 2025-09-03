import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';

/** YouTube Player wrapper component for Content Pages */
@Component({
  selector: 'hra-youtube-player',
  imports: [CommonModule, YouTubePlayer],
  template: `<youtube-player [videoId]="videoId()" />`,
  styleUrl: './youtube-player.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HraYoutubePlayerComponent {
  /** The ID of the YouTube video to play*/
  protected readonly videoId = input.required<string>();
}
