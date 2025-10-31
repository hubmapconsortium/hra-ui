import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HraCommonModule } from '@hra-ui/common';
import { AssetUrlPipe } from '@hra-ui/common/url';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ProfileCardComponent } from '@hra-ui/design-system/cards/profile-card';
import { IconsModule } from '@hra-ui/design-system/icons';
import { FooterComponent } from '@hra-ui/design-system/navigation/footer';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { CONTRIBUTORS, VIDEO_SECTIONS } from '../../static/home';
import { HraYoutubePlayerComponent } from '@hra-ui/design-system/content-templates/youtube-player';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  /** List of contributors */
  protected readonly contributors = CONTRIBUTORS;

  /** List of video sections - for chapters */
  protected readonly videoSections = VIDEO_SECTIONS;

  /** Signal for selected video section state */
  protected readonly selectedVideoSection = signal<number>(0);
}
