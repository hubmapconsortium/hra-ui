import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { AssetUrlPipe } from '@hra-ui/cdk/app-href';
import { FooterComponent } from '@hra-ui/design-system/footer';
import { NavHeaderComponent } from '@hra-ui/design-system/nav-header';

import { VisualCard, VisualCardComponent } from '../../components/visual-card/visual-card.component';
import { HUBMAP_CARDS_DATA } from '../create-visualization-page/create-visualization-page.component';

/**
 * Landing Page Component
 */
@Component({
  selector: 'cde-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    VisualCardComponent,
    MatIconModule,
    MatButtonModule,
    YouTubePlayerModule,
    FooterComponent,
    AssetUrlPipe,
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
  readonly sideNavData = HUBMAP_CARDS_DATA;
}
