import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { YouTubePlayerModule } from '@angular/youtube-player';

import { FooterComponent } from '@hra-ui/design-system/footer';
import { HeaderComponent } from '../../components/header/header.component';
import { VisualCard, VisualCardComponent } from '../../components/visual-card/visual-card.component';

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
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {
  /** Visual cards to display on the landing page */
  readonly cards = input<VisualCard[]>([]);
}
