import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

/** A single card */
interface LinkCard {
  /** Body text */
  body: string;
  /** Button text */
  buttonTitle: string;
  /** Button url */
  buttonUrl: string;
}

/** Cards component */
@Component({
  selector: 'ccf-link-cards',
  templateUrl: './link-cards.component.html',
  styleUrls: ['./link-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class LinkCardsComponent implements OnInit {
  /** Rui app url */
  @Input() ruiUrl!: string;
  /** Eui app url */
  @Input() euiUrl!: string;
  /** Asctb app url */
  @Input() asctbUrl!: string;
  /** Hra portal url */
  @Input() hraPortalUrl!: string;
  /** Course url */
  @Input() onlineCourseUrl!: string;
  /** Paper url */
  @Input() paperUrl!: string;

  /** Link cards */
  linkCards: LinkCard[] = [
    {
      body: 'Add tissue blocks using the HRA Registration User Interface (RUI).',
      buttonTitle: 'Register Tissue',
      buttonUrl: 'https://hubmapconsortium.github.io/ccf-ui/rui/',
    },
    {
      body: 'Explore tissue sections in tissue blocks with the HRA Exploration User Interface (EUI).',
      buttonTitle: 'Explore Tissue',
      buttonUrl: 'https://portal.hubmapconsortium.org/ccf-eui',
    },
    {
      body: 'View linkages between anatomical structures, cell types, and common biomarkers (ASCT+B).',
      buttonTitle: 'ASCT+B Reporter',
      buttonUrl: 'https://hubmapconsortium.github.io/ccf-asct-reporter/',
    },
  ];

  /** Deep dive cards */
  deepDives: LinkCard[] = [
    {
      body: '',
      buttonTitle: 'HRA Portal',
      buttonUrl: 'https://humanatlas.io',
    },
    {
      body: '',
      buttonTitle: 'Online Course',
      buttonUrl: 'https://expand.iu.edu/browse/sice/cns/courses/hubmap-visible-human-mooc',
    },
    {
      body: '',
      buttonTitle: 'Paper',
      buttonUrl: 'https://www.biorxiv.org/content/10.1101/2024.03.27.587041',
    },
  ];

  /** Initialize the component */
  ngOnInit() {
    const linkUrls = [this.ruiUrl, this.euiUrl, this.asctbUrl];
    const deepDivesUrls = [this.hraPortalUrl, this.onlineCourseUrl, this.paperUrl];
    this.linkCards = this.linkCards.map((card, index) => ({ ...card, buttonUrl: linkUrls[index] ?? card.buttonUrl }));
    this.deepDives = this.deepDives.map((card, index) => ({
      ...card,
      buttonUrl: deepDivesUrls[index] ?? card.buttonUrl,
    }));
  }

  /** Opens a url in a new tab/window */
  goToURL(url: string): void {
    window.open(url, '_blank');
  }
}
