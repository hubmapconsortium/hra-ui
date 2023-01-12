import { NavItems } from "../components/toolbar/nav-items";


export const NAVIGATION_ITEMS: NavItems[] = [
  {
    menuName: 'Data',
    children: [
      {
        menuName: 'Overview: HRA Data',
        route: 'overview-data',
        disabled: false,
        divider: true
      },
      {
        menuName: 'Anatomical Structures, Cell Types + Biomarkers (ASCT+B) Tables',
        route: 'asctb-tables',
        disabled: true
      },
      {
        menuName: 'Anatomical Structures, Cell Types + Biomarkers (ASCT+B) Cell Types Data from Azimuth',
        route: 'asctb-azimuth',
        disabled: true
      },
      {
        menuName: 'Vasculature Common Coordinate Framework',
        route: 'vccf'
      },
      {
        menuName: '2D Functional Tissue Unit (FTU) Illustrations',
        route: '2d-ftu-illustrations',
        disabled: true
      },
      {
        menuName: '3D Reference Object Library',
        route: '3d-reference-library',
        disabled: true
      },
      {
        menuName: 'Organ Mapping Antibody Panels (OMAPs)',
        route: 'omap',
        disabled: true
      },
      {
        menuName: '4th Release Notes',
        route: 'release-notes/v1.3',
        divider: true
      },
      {
        menuName: 'HuBMAP Data Portal',
        disabled: true,
        url: "https://portal.hubmapconsortium.org/"
      }
    ]
  },
  {
    menuName: 'CCF Ontology',
    route: 'ccf-ontology',
    disabled: true,
  },
  {
    menuName: 'Tools',
    children: [
      {
        menuName: 'Overview: HRA Tools',
        route: 'overview-tools',
        disabled: true,
        divider: true
      },
      {
        menuName: 'Anatomical Structures, Cell Types + Biomarkers (ASCT+B) Reporter',
        route: 'asctb-reporter',
        disabled: true
      },
      {
        menuName: 'Cell Population Graphs',
        route: 'cell-population-graphs',
        disabled: true
      },
      {
        menuName: 'Registration User Interface (RUI)',
        route: 'registration-user-interface',
        disabled: true
      },
      {
        menuName: 'Exploration User Interface (EUI)',
        route: 'exploration-user-interface',
        disabled: true
      },
      {
        menuName: 'HRA Organ VR Gallery',
        route: 'vr-organ-gallery'
      },
      {
        menuName: 'HRA Millitome',
        route: 'hra-millitome',
        disabled: true
      },
      {
        menuName: 'Application Programming Interfaces',
        route: 'api',
        disabled: true
      },
      {
        menuName: 'Usage Metrics',
        route: 'usage-metrics',
        disabled: true,
        divider: true
      },
      {
        menuName: 'ASCT+B Ontology Validations',
        url: 'https://hubmapconsortium.github.io/ccf-validation-tools/'
      }
    ]
  },
  {
    menuName: 'Training & Outreach',
    children: [
      {
        menuName: 'Overview: HRA Training and Outreach',
        route: 'overview-training-outreach',
        disabled: true,
        divider: true
      },
      {
        menuName: 'Visible Human Massive Open Online Course',
        url: 'https://expand.iu.edu/browse/sice/cns/courses/hubmap-visible-human-mooc',
        disabled: true
      },
      {
        menuName: 'HRA Standard Operating Procedures',
        route: 'standard-operating-procedures',
        disabled: true
      },
      {
        menuName: 'Kaggle #1: HuBMAP - Hacking the Kidney',
        route: 'kaggle-one',
        disabled: true
      },
      {
        menuName: 'Kaggle #2: HuBMAP + HPA - Hacking the Human Body',
        route: 'kaggle-two',
        disabled: true
      },
      // {
      //   menuName: 'Scrollytelling Series',
      //   route: 'scrollytelling-series'
      // },
      {
        menuName: '24 Hour Human Reference Atlas Event',
        url: 'https://youtube.com/playlist?list=PL-CUnYVIy7DOVqQbrzhnLEtY8uoVHKXOI'
      }

    ]
  },
  {
    menuName: 'About',
    children: [
      {
        menuName: 'About MC-IU',
        route: 'about-mc-iu'
      },
      {
        menuName: 'HRA Editorial Board',
        route: 'editorial-board'
      }
    ]
  }
];
