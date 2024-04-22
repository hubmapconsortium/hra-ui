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
    ],
  },
  {
    menuName: 'Use the HRA',
    children: [
      {
        menuName: 'Overview: HRA Use Cases',
        route: 'overview-use-the-hra',
        divider: true,
      },
      {
        menuName: 'Improve Cell Type Annotations',
        route: 'user-story/1',
      },
      {
        menuName: 'Predict 3D Spatial Origin of Tissue Samples',
        route: 'user-story/2',
      },
      {
        menuName: 'Explore Biomarker Expressions for Cell Types',
        route: 'user-story/3',
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
        menuName: 'Cell Population Graphs',
        route: 'cell-population-graphs',
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
        menuName: 'Functional Tissue Unit Explorer',
        url: 'https://apps.humanatlas.io/ftu-explorer/#/',
      },
      {
        menuName: 'Organ Gallery in VR',
        route: 'organ-gallery-in-vr',
      },
      {
        menuName: 'Millitome',
        route: 'millitome',
        disabled: true,
      },
      {
        menuName: 'Application Programming Interfaces (APIs)',
        route: 'api',
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
        menuName: 'HRA User Stories',
        url: 'https://docs.google.com/document/d/1I4gFPY47EBKEIDQ-hWTcxCUsGRxL7yJqKfCvlQAQe5Y/edit#heading=h.6n4dk68tke9a',
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
    ],
  },
];
