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
          route: 'azimuth-route',
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
          route: 'omap-route',
          disabled: true,
          divider: true
        },
        {
          menuName: 'HuBMAP Data Portal',
          route: 'hubmap-portal',
          disabled: true
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
          route: 'ccf-cell-route',
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
          menuName: 'HRA Milletome',
          route: 'ccf-hra-millitome',
          disabled: true
        },
        {
          menuName: 'HRA Application Programming Interfaces',
          route: 'api-route',
          disabled: true
        },
        {
          menuName: 'HRA Usage Metrics',
          route: 'usage-route',
          disabled: true
        }
      ]
    },
    {
      menuName: 'Training and Outreach',
      children: [
        {
          menuName: 'Overview: HRA Training and Outreach',
          route: 'training-route',
          disabled: true,
          divider: true
        },
        {
          menuName: 'Visible Human Massive Open Online Course',
          route: 'mooc-route',
          disabled: true
        },
        {
          menuName: 'HRA Standard Operating Procedures',
          route: 'sop-route',
          disabled: true
        },
        {
          menuName: 'Kaggle Competition Awards 2021',
          route: 'kaggle-2021-route',
          disabled: true
        },
        {
          menuName: 'Kaggle Competition Awards 2022',
          route: 'kaggle-2022-route',
          disabled: true
        }
      ]
    },
    {
      menuName: 'About',
      route: 'about-route',
      disabled: true
    }
  ];