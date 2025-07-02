import { ChangeDetectionStrategy, Component } from '@angular/core';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ProfileCardComponent } from '@hra-ui/design-system/cards/profile-card';
import { IconButtonSizeDirective, IconButtonVariantDirective } from '@hra-ui/design-system/icon-button';
import { IconsModule } from '@hra-ui/design-system/icons';
import { FooterComponent } from '@hra-ui/design-system/navigation/footer';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    IconsModule,
    ButtonsModule,
    YouTubePlayerModule,
    ScrollingModule,
    ProfileCardComponent,
    IconButtonVariantDirective,
    IconButtonSizeDirective,
    FooterComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
