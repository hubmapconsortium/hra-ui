import { NavItems } from '../components/toolbar/nav-items';

/** Training outreach route */
const trainingOutreachRoute = 'overview-training-outreach';

/** Details of Menu items their children and their routes */
export const NAVIGATION_ITEMS: NavItems[] = [
  {
    menuName: 'Data',
    children: [
      {
        menuName: 'Overview: HRA Data',
        route: 'overview-data',
        disabled: false,
        divider: true,
      },
      {
        menuName: 'Anatomical Structures, Cell Types + Biomarkers (ASCT+B) Tables',
        route: 'asctb-tables',
        disabled: true,
      },
      {
        menuName: 'Cell Type Annotations',
        route: 'cell-type-annotations',
      },
      {
        menuName: 'Anatomical Structures, Cell Types + Biomarkers (ASCT+B) Cell Types Data from Azimuth',
        route: 'asctb-azimuth',
        disabled: true,
      },
      {
        menuName: 'Vasculature Common Coordinate Framework',
        route: 'vccf',
      },
      {
        menuName: '2D Functional Tissue Unit (FTU) Illustrations',
        route: '2d-ftu-illustrations',
        disabled: true,
      },
      {
        menuName: '3D Reference Object Library',
        route: '3d-reference-library',
        disabled: true,
      },
      {
        menuName: 'Organ Mapping Antibody Panels (OMAPs)',
        route: 'omap',
        disabled: true,
      },
      {
        menuName: 'CCF Ontology',
        route: 'ccf-ontology',
        divider: true,
      },
      {
        menuName: 'HuBMAP Data Portal',
        disabled: true,
        url: 'https://portal.hubmapconsortium.org/',
      },
      {
        menuName: 'SenNet Data Portal',
        disabled: true,
        url: 'https://data.sennetconsortium.org/',
      },
      {
        menuName: 'KPMP Kidney Tissue Atlas',
        disabled: true,
        url: 'https://atlas.kpmp.org/',
      },
    ],
  },
  {
    menuName: 'Use HRA Previews',
    children: [
      {
        menuName: 'Overview: Use HRA Previews',
        route: 'overview-use-the-hra',
        divider: true,
      },
      {
        menuName: 'Preview: Improve Cell Type Annotations',
        route: 'user-story/1',
      },
      {
        menuName: 'Preview: Predict 3D Spatial Origin of Tissue Samples',
        route: 'user-story/2',
      },
      {
        menuName: 'Preview: Explore Biomarker Expressions for Cell Types',
        route: 'user-story/3',
      },
      {
        menuName: 'Preview: Functional Tissue Unit Explorer',
        route: 'user-story/4',
      },
      {
        menuName: 'Preview: Cell Distance Explorer',
        route: 'user-story/5',
      },
      {
        menuName: 'Preview: Use Atlas Components',
        route: 'user-story/6',
      },
      {
        menuName: 'Preview: Track Atlas Evolution and Usage',
        route: 'user-story/7',
      },
    ],
  },
  {
    menuName: 'Tools',
    children: [
      {
        menuName: 'Overview: HRA Tools',
        route: 'overview-tools',
        disabled: true,
        divider: true,
      },
      {
        menuName: 'Anatomical Structures, Cell Types + Biomarkers (ASCT+B) Reporter',
        route: 'asctb-reporter',
        disabled: true,
      },
      {
        menuName: 'Registration User Interface (RUI)',
        route: 'registration-user-interface',
        disabled: true,
      },
      {
        menuName: 'Exploration User Interface (EUI)',
        route: 'exploration-user-interface',
        disabled: true,
      },
      {
        menuName: 'HRA Organ Gallery',
        route: 'hra-organ-gallery',
      },
      {
        menuName: 'HRA API',
        route: 'api',
        disabled: true,
        divider: true,
      },
      {
        menuName: 'Preview: Functional Tissue Unit Explorer',
        route: 'user-story/4',
      },
      {
        menuName: 'Preview: Cell Distance Explorer',
        route: 'user-story/5',
      },
      {
        menuName: 'Preview: Atlas Components',
        route: 'user-story/6',
      },
      {
        menuName: 'Preview: HRA Dashboard',
        route: 'user-story/7',
      },
      {
        menuName: 'Preview: Cell Population Graphs',
        route: 'cell-population-graphs',
        disabled: true,
      },
      {
        menuName: 'Preview: Millitome',
        route: 'millitome',
        disabled: true,
      },
    ],
  },
  {
    menuName: 'Training & Outreach',
    children: [
      {
        menuName: 'Overview: HRA Training and Outreach',
        route: trainingOutreachRoute,
        disabled: true,
        divider: true,
      },
      {
        menuName: 'Visible Human Massive Open Online Course',
        url: 'https://expand.iu.edu/browse/sice/cns/courses/hubmap-visible-human-mooc',
        disabled: true,
      },
      {
        menuName: 'Standard Operating Procedures',
        route: 'standard-operating-procedures',
        disabled: true,
      },
      {
        menuName: 'Outreach',
        route: trainingOutreachRoute,
        fragment: 'outreach',
      },
      {
        menuName: 'Release Notes',
        route: trainingOutreachRoute,
        fragment: 'release-notes',
      },
      {
        menuName: 'Human Atlas Stories',
        route: trainingOutreachRoute,
        fragment: 'human-atlas-stories',
      },
      {
        menuName: 'Previews',
        route: trainingOutreachRoute,
        fragment: 'previews',
      },
    ],
  },
  {
    menuName: 'About',
    children: [
      {
        menuName: 'About the Team',
        route: 'team',
      },
      {
        menuName: 'HRA Editorial Board',
        route: 'editorial-board',
      },
      {
        menuName: 'Publications',
        route: 'team',
        fragment: 'publications',
      },
    ],
  },
];
