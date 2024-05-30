import { Route } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { DashboardComponentOutletComponent } from '@hra-ui/dashboard';

export const appRoutes: Route[] = [
  { path: 'hra-landing', component: LandingComponent },
  {
    path: 'test',
    component: DashboardComponentOutletComponent,
    data: {
      spec: {
        type: 'Dashboard',
        title: 'Data',
        description:
          'The HRA Knowledge Graph interlinks the 10 different data types in the Human Reference Atlas. Key counts are provided plus the number ofanatomical structure and cell type terms added to existing ontologies. Visualizations show the growth of the HRA since the first release, its 3D spatial coverage, and the number of data type instances per anatomical structure.',
        link: {
          url: 'https://www.nature.com/articles/s41556-021-00788-6',
          label: 'Read Paper',
        },
        items: [
          {
            type: 'MetricsContainer',
            items: [
              {
                title: 'Size of the HRA',
                tooltip: 'tooltip data',
                source: 'https://humanatlas.io',
                items: [
                  {
                    label: 'HRA-KG Size',
                    count: 36631,
                    unit: 'MB',
                  },
                  {
                    label: 'HRA-KG Nodes',
                    count: 1940490,
                  },
                  {
                    label: 'edges in the HRA-KG',
                    count: 11633795,
                  },
                ],
              },
              {
                title: 'Digital Objects',
                tooltip: 'Im a tooltip',
                items: [
                  { label: 'ASCT+B Tables', count: 36 },
                  { label: 'OMAP Tables', count: 13 },
                  { label: 'FTU Illustrations', count: 22 },
                  { label: '3D Organ Models', count: 65 },
                  { label: 'Blood Vessel Segments', count: 1 },
                  { label: 'SOPs', count: 20 },
                ],
              },
              {
                title: 'Ontologies Extended',
                tooltip: 'Im a tooltip',
                items: [
                  { label: 'Terms added to Uberon', count: 85 },
                  { label: 'Terms added to CL', count: 129 },
                  { label: 'Terms added to PCL', count: 468 },
                ],
              },
            ],
          },
          {
            type: 'ImageContainer',
            title: 'HRA Growth Per Release',
            tooltip: 'Im a tooltip',
            imageUrl: 'https://cdn.humanatlas.io/hra-dashboard-data/data/hra-growth.vl.json',
          },
        ],
      },
    },
  },
  { path: '**', component: LandingComponent },
];
