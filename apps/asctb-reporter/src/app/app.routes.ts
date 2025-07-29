import { Route } from '@angular/router';
import { BreadcrumbItem } from '@hra-ui/design-system/buttons/breadcrumbs';
import { HomeComponent } from './components/home/home.component';
import { RootComponent } from './modules/root/root.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    data: {
      crumbs: [
        { name: 'Apps', route: 'https://apps.humanatlas.io' },
        { name: 'ASCT+B Reporter' },
      ] satisfies BreadcrumbItem[],
    },
  },
  {
    path: 'vis',
    component: RootComponent,
    data: {
      crumbs: [
        { name: 'Apps', route: 'https://apps.humanatlas.io' },
        { name: 'ASCT+B Reporter', route: '../' },
        { name: 'Visualization app' },
      ] satisfies BreadcrumbItem[],
      appControls: true,
    },
  },

  // TODO external redirect to docs.humanatlas.io
  // Port existing content to doc portal
  // {
  //   path: 'docs',
  //   component: DocsComponent,
  // },
  // {
  //   path: 'docs/:id',
  //   component: DocsComponent,
  // },
];
