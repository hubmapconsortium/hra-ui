import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HraCommonModule } from '@hra-ui/common';
import { AssetUrlPipe } from '@hra-ui/common/url';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ProfileCardComponent } from '@hra-ui/design-system/cards/profile-card';
import { HraYoutubePlayerComponent } from '@hra-ui/design-system/content-templates/youtube-player';
import { IconsModule } from '@hra-ui/design-system/icons';
import { FooterComponent } from '@hra-ui/design-system/navigation/footer';
import { CONTRIBUTORS } from '../../static/home';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    IconsModule,
    ButtonsModule,
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
}
