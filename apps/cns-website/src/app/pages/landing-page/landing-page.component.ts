import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { HraCommonModule } from '@hra-ui/common';
import { ContentButtonComponent } from '@hra-ui/design-system/cards/content-button';
import { GalleryGridComponent, GalleryGridItemDirective } from '@hra-ui/design-system/gallery-grid';
import { FooterComponent } from '../../components/footer/footer.component';

/** Content Types Array */
const ContentTypes = ['Featured', 'Publications', 'News'] as const;

/** Content Type */
type ContentType = (typeof ContentTypes)[number];

/** Interface for content card */
interface LandingPageContentCard {
  /** Image url */
  imageSrc: string;
  /** Date */
  date: string;
  /** Tagline */
  tagline: string;
  /** Tags */
  tags: string[];
  /** Link */
  link: string;
  /** External link */
  external: boolean;
  /** Content type */
  contentType: ContentType;
}

/**
 * Landing page of CNS website
 */
@Component({
  selector: 'cns-landing-page',
  imports: [
    HraCommonModule,
    FooterComponent,
    MatButtonToggleModule,
    GalleryGridComponent,
    ContentButtonComponent,
    GalleryGridItemDirective,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {
  /** Content Types */
  protected readonly contentTypes = ContentTypes;

  /** Selected content type */
  protected readonly selectedContentType = signal<ContentType>('Featured');

  /** Temporary content cards data */
  protected readonly contentCards: LandingPageContentCard[] = [
    {
      imageSrc: 'assets/ui-images/placeholder.png',
      date: '2024-01-15',
      tagline: 'Featured Research: Advances in Neural Networks',
      tags: ['AI', 'Research'],
      link: '/research/neural-networks',
      external: false,
      contentType: 'Featured',
    },
    {
      imageSrc: 'assets/ui-images/placeholder.png',
      date: '2024-01-10',
      tagline: 'New Publication: Deep Learning in Medical Imaging',
      tags: ['Publication', 'Deep Learning'],
      link: '/publications/medical-imaging',
      external: false,
      contentType: 'Publications',
    },
    {
      imageSrc: 'assets/ui-images/placeholder.png',
      date: '2024-01-05',
      tagline: 'CNS Team Wins Best Paper Award at Conference',
      tags: ['Award', 'Conference'],
      link: 'https://example.com/news/best-paper',
      external: true,
      contentType: 'News',
    },
    {
      imageSrc: 'assets/ui-images/placeholder.png',
      date: '2023-12-20',
      tagline: 'Featured: Breakthrough in Computational Neuroscience',
      tags: ['Neuroscience', 'Innovation'],
      link: '/featured/computational-breakthrough',
      external: false,
      contentType: 'Featured',
    },
    {
      imageSrc: 'assets/ui-images/placeholder.png',
      date: '2023-12-15',
      tagline: 'Latest Publication on Brain Connectivity Analysis',
      tags: ['Brain', 'Connectivity'],
      link: '/publications/brain-connectivity',
      external: false,
      contentType: 'Publications',
    },
    {
      imageSrc: 'assets/ui-images/placeholder.png',
      date: '2023-12-10',
      tagline: 'CNS Lab Receives Major Research Grant',
      tags: ['Funding', 'Research'],
      link: '/news/research-grant',
      external: false,
      contentType: 'News',
    },
  ];
}
