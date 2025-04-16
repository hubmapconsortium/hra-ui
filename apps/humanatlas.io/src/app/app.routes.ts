import { ResolveFn, Route } from '@angular/router';

import { CarouselItem } from './components-v2/carousel/carousel.schema';
import { CardInfo } from './components-v2/count-info/count-info.component';
import { SectionCardItem } from './components-v2/section-cards/section-cards.schema';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

/** Test carousel items (will replace) */
const testCarouselItems: CarouselItem[] = [
  {
    tagline: 'Map the human body at single cell resolution',
    description: 'Read our flagship paper about the thousands of experts building a Human Reference Atlas.',
    imageSrc: 'assets/images/carousel1.svg',
    action: 'View Paper',
    link: { url: 'https://doi.org/10.1038/s41556-021-00788-6' },
  },
  {
    tagline: 'Contribute data to the Human Reference Atlas',
    description: 'Use the ASCT+B Reporter tool to explore data in the context of the Human Reference Atlas.',
    imageSrc: 'assets/images/carousel3.svg',
    action: 'Learn More',
    link: { route: 'asctb-reporter' },
  },
  {
    tagline: 'Learn more about the Human BioMolecular Atlas Program',
    description: 'Explore HuBMAP data, code, and documentation using the HuBMAP Data Portal.',
    imageSrc: 'assets/images/carousel6.svg',
    action: 'HuBMAP Data Portal',
    link: { url: 'https://portal.hubmapconsortium.org/' },
  },
  {
    tagline: 'Learn more about the Cellular Senescence Network (SenNet) Program',
    description: 'Explore SenNet data, code, and documentation using the SenNet Data Portal.',
    imageSrc: 'assets/images/carousel_sennet.svg',
    action: 'SenNet Data Portal',
    link: { url: 'https://data.sennetconsortium.org/' },
  },
];

/** Test cards (will replace) */
const testCardInfo: CardInfo[] = [
  {
    count: '17',
    label: 'consortia',
    icon: { fontText: 'diversity_3' },
  },
  {
    count: '250+',
    label: 'experts',
    icon: { fontText: 'school' },
  },
  {
    count: '1,000+',
    label: 'publications',
    icon: { fontText: 'docs' },
  },
  {
    count: '71',
    label: 'organs',
    icon: { fontText: 'neurology' },
  },
  {
    count: '4,694',
    label: 'anatomical structures',
    icon: { fontText: 'favorite' },
  },
  {
    count: '1,288',
    label: 'cell types',
    icon: { url: 'assets/images/cell-types.svg' },
  },
  {
    count: '2,018',
    label: 'biomarkers',
    icon: { fontText: 'add_location' },
  },
  {
    count: '23',
    label: 'organ mapping antibody panels',
    icon: { fontText: 'map' },
  },
  {
    count: '22',
    label: 'functional tissue units',
    icon: { fontText: 'layers' },
  },
];

/** Test section card items (will replace) */
const testSectionCardItems: SectionCardItem[] = [
  {
    tagline: 'Join',
    description: 'Register for the monthly Human Reference Atlas Working Group',
    imageSrc: 'assets/images/section-card-images/join.svg',
    route: 'overview-data',
  },
  {
    tagline: 'Data',
    description: 'Research the data constructing Human Reference Atlas',
    imageSrc: 'assets/images/section-card-images/data.svg',
    route: 'ccf-ontology',
  },
  {
    tagline: 'Apps',
    description: 'Construct, visualize, and use Human Reference Atlas applications',
    imageSrc: 'assets/images/section-card-images/apps.svg',
    route: 'overview-tools',
  },
  {
    tagline: 'Training',
    description: 'Check out HuBMAP’s education and engagement efforts',
    imageSrc: 'assets/images/section-card-images/training.svg',
    route: 'overview-training-outreach',
  },
];

/** Carousel items resolver */
export const carouselItemsResolver: ResolveFn<CarouselItem[]> = () => {
  return testCarouselItems;
};

/** Count info resolver */
export const countInfoResolver: ResolveFn<CardInfo[]> = () => {
  return testCardInfo;
};

/** Section card info resolver */
export const sectionCardInfoResolver: ResolveFn<SectionCardItem[]> = () => {
  return testSectionCardItems;
};

/** Application routes */
export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingPageComponent,
    resolve: {
      carouselItems: carouselItemsResolver,
      countInfo: countInfoResolver,
      sectionCardInfo: sectionCardInfoResolver,
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
