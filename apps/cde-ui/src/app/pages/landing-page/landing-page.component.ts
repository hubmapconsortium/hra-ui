import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualCard, VisualCardComponent } from '../../components/visual-card/visual-card.component';
import { MatIconModule } from '@angular/material/icon';
import { YouTubePlayerModule } from '@angular/youtube-player';

@Component({
  selector: 'cde-landing-page',
  standalone: true,
  imports: [CommonModule, VisualCardComponent, MatIconModule, YouTubePlayerModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {
  data: VisualCard[] = [
    {
      image: '../../assets/examples/intestine.svg',
      label: 'Explore 2D Intestine Data',
      url: 'https://www.google.com',
    },
    {
      image: '../../assets/examples/skin.svg',
      label: 'Explore 3D Skin Data',
      url: 'https://www.google.com',
    },
    {
      image: '../../assets/examples/tonsil.svg',
      label: 'Create a Visualization',
      url: 'https://www.google.com',
    },
  ];
}
