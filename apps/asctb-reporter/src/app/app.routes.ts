import { Route } from '@angular/router';
import { BreadcrumbItem } from '@hra-ui/design-system/buttons/breadcrumbs';
import { HomeComponent } from './components/home/home.component';
import { DocsComponent } from './modules/docs/docs.component';
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
    },
  },
  {
    path: 'playground',
    component: RootComponent,
  },
  {
    path: 'vis/:sheet/:version/:playground',
    component: RootComponent,
  },
  {
    path: 'docs',
    component: DocsComponent,
  },
  {
    path: 'docs/:id',
    component: DocsComponent,
  },
];
