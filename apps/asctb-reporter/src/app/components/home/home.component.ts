import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { YouTubePlayer, YouTubePlayerModule } from '@angular/youtube-player';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ProfileCardComponent } from '@hra-ui/design-system/cards/profile-card';
import { IconButtonSizeDirective, IconButtonVariantDirective } from '@hra-ui/design-system/icon-button';
import { IconsModule } from '@hra-ui/design-system/icons';
import { FooterComponent } from '@hra-ui/design-system/navigation/footer';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { CONTRIBUTORS, VIDEO_SECTIONS } from '../../static/home';
import { AssetUrlPipe } from '@hra-ui/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    CommonModule,
    IconsModule,
    ButtonsModule,
    YouTubePlayerModule,
    ScrollingModule,
    ProfileCardComponent,
    IconButtonVariantDirective,
    IconButtonSizeDirective,
    FooterComponent,
    RouterModule,
    AssetUrlPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  /** List of contributors */
  protected readonly contributors = CONTRIBUTORS;

  /** List of video sections - for chapters */
  protected readonly videoSections = VIDEO_SECTIONS;

  /** ViewChild reference to the YouTube player */
  private readonly player = viewChild.required<YouTubePlayer>('tutorialVideo');

  /** Signal for selected video section state */
  protected readonly selectedVideoSection = signal<number>(0);

  /**
   * Seeks the YouTube player to the selected video section.
   * @param seconds The target time in seconds to seek to.
   * @param id Unique identifier of the video section.
   */
  protected seekVideo(seconds: number, id: number) {
    this.selectedVideoSection.set(id);
    this.player().pauseVideo();
    this.player().seekTo(seconds, true);
    this.player().playVideo();
  }
}
