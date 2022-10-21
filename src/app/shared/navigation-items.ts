import { NavItems } from "../components/toolbar/nav-items";


export const NAVIGATION_ITEMS: NavItems[] = [
    {
      menuName: 'Data',
      children: [
        {
          menuName: 'Overview: HRA Data',
          route: 'ccf-overview-data',
          disabled: false,
          divider: true
        },
        {
          menuName: 'CCF Anatomical Structures, Cell Types + Biomarkers (ASCT+B) Tables',
          route: 'ccf-anatomical-structures',
          disabled: true
        },
        {
          menuName: 'Anatomical Structures, Cell Types + Biomarkers (ASCT+B) Cell Types Data from Azimuth',
          route: 'ccf-asctb-azimuth',
          disabled: true
        },
        {
          menuName: 'CCF 2D Reference Object Library',
          route: 'ccf-2d-reference-library',
          disabled: true
        },
        {
          menuName: 'CCF 3D Reference Object Library',
          route: 'ccf-3d-reference-library',
          disabled: true
        },
        {
          menuName: 'Organ Mapping Antibody Panels (OMAPs)',
          route: 'ccf-omaps',
          disabled: true,
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
          route: 'ccf-overview-tools',
          disabled: true,
          divider: true
        },
        {
          menuName: 'CCF Anatomical Structures, Cell Types + Biomarkers (ASCT+B) Reporter',
          route: 'ccf-asctb-reporter',
          disabled: true
        },
        {
          menuName: 'CCF Cell Population Graphs',
          route: 'ccf-cell-population-graphs',
          disabled: true
        },
        {
          menuName: 'CCF Registration User Interface (RUI)',
          route: 'ccf-registration-user-interface',
          disabled: true
        },
        {
          menuName: 'CCF Exploration User Interface (EUI)',
          route: 'ccf-exploration-user-interface',
          disabled: true
        },
        {
          menuName: 'HRA Millitome',
          route: 'ccf-hra-millitome',
          disabled: true
        },
        {
          menuName: 'HRA Application Programming Interfaces',
          route: 'ccf-hra-api',
          disabled: true
        },
        {
          menuName: 'HRA Usage Metrics',
          route: 'ccf-hra-usage-metrics',
          disabled: true
        }
      ]
    },
    {
      menuName: 'Training & Outreach',
      children: [
        {
          menuName: 'Overview: HRA Training and Outreach',
          route: 'ccf-overview-training-outreach',
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
          route: 'ccf-hra-sop',
          disabled: true
        },
        {
          menuName: 'Kaggle #1: HuBMAP - Hacking the Kidney',
          route: 'ccf-kaggle-twentyone',
          disabled: true
        },
        {
          menuName: 'Kaggle #2: HuBMAP + HPA - Hacking the Human Body',
          route: 'ccf-kaggle-two',
          disabled: true
        }
      ]
    },
    {
      menuName: 'About',
      route: 'ccf-about',
      disabled: true
    }
  ];
