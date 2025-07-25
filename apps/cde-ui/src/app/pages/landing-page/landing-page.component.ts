import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { NavHeaderComponent } from '@hra-ui/design-system/nav-header';
import { NavigationModule } from '@hra-ui/design-system/navigation';
import { VisualCard, VisualCardComponent } from '../../components/visual-card/visual-card.component';
import SIDENAV_CONTENT from '../../shared/data/sidenav-content.json';

/**
 * Landing Page Component
 */
@Component({
  selector: 'cde-landing-page',
  imports: [
    HraCommonModule,
    VisualCardComponent,
    MatIconModule,
    ButtonsModule,
    YouTubePlayerModule,
    NavigationModule,
    NavHeaderComponent,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {
  /** Visual cards to display on the landing page */
  readonly cards = input<VisualCard[]>([]);

  /** Data for sidenav cards */
  readonly sideNavData = SIDENAV_CONTENT;
}
