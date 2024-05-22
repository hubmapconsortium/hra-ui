import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LongCard, LongCardComponent } from '../../components/long-card/long-card.component';

/** Landing Page Component */
@Component({
  selector: 'hra-landing',
  standalone: true,
  imports: [CommonModule, LongCardComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {
  /** Card component input data */
  cardData: LongCard[] = [
    {
      image: 'assets/backgrounds/data.svg',
      label: 'Data',
      alt: 'Image for Data card',
      route: 'data',
    },
    {
      image: 'assets/backgrounds/usage.svg',
      label: 'Usage',
      alt: 'Image for Usage card',
      route: 'usage',
    },
    {
      image: 'assets/backgrounds/diversity.svg',
      label: 'Diversity & Inclusion',
      alt: 'Image for Diversity and Inclusion Card',
      route: 'diversity-and-inclusion',
    },
    {
      image: 'assets/backgrounds/publication.svg',
      label: 'Publications',
      alt: 'Image for Publication card',
      route: 'publications',
    },
    {
      image: 'assets/backgrounds/experimental.svg',
      label: 'Experimental Data',
      alt: 'Image for Experimental Data card',
      route: 'experimental-data',
    },
  ];
}
