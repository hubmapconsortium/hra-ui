import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HraCommonModule } from '@hra-ui/common';
import { AssetUrlPipe } from '@hra-ui/common/url';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ProfileCardComponent } from '@hra-ui/design-system/cards/profile-card';
import { HraYoutubePlayerComponent } from '@hra-ui/design-system/content-templates/youtube-player';
import { IconsModule } from '@hra-ui/design-system/icons';
import { FooterComponent } from '@hra-ui/design-system/navigation/footer';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { CONTRIBUTORS, VIDEO_SECTIONS } from '../../static/home';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    IconsModule,
    ButtonsModule,
    ScrollingModule,
    ProfileCardComponent,
    FooterComponent,
    RouterModule,
    AssetUrlPipe,
    HraCommonModule,
    HraYoutubePlayerComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  /** List of contributors */
  protected readonly contributors = CONTRIBUTORS;

  /** List of video sections - for chapters */
  protected readonly videoSections = VIDEO_SECTIONS;

  /** Signal for selected video section state */
  readonly selectedVideoSection = signal<number>(0);

  /** ViewChild reference to the HraYouTubePlayer component */
  private readonly youtubePlayerComponent = viewChild.required<HraYoutubePlayerComponent>('youtubePlayer');

  /**
   * Seeks the YouTube player to the selected video section.
   * @param seconds The target time in seconds to seek to.
   * @param index Index of the video section in the chapters list.
   */
  protected seekVideo(seconds: number, index: number): void {
    this.selectedVideoSection.set(index);
    const player = this.youtubePlayerComponent().player();
    player?.pauseVideo();
    player?.seekTo(seconds, true);
    player?.playVideo();
  }
}
