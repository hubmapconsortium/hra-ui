import { Route } from '@angular/router';
import { BreadcrumbItem } from '@hra-ui/design-system/buttons/breadcrumbs';
import { NotFoundPageComponent } from '@hra-ui/design-system/error-pages/not-found-page';
import { FtuComponent } from './pages/ftu-page/ftu.component';
import { ftuResolver } from './pages/ftu-page/ftu.resolver';
import { LandingComponent } from './pages/landing-page/landing.component';

/**
 * Application routes definition
 */
export const ROUTES: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingComponent,
    data: {
      isLanding: true,
      crumbs: [
        { name: 'Apps', route: 'https://apps.humanatlas.io' },
        { name: 'Functional Tissue Unit Explorer' },
      ] satisfies BreadcrumbItem[],
    },
  },
  {
    path: 'ftu',
    component: FtuComponent,
    data: {
      name: 'ftu',
      id: 'https://purl.humanatlas.io/2d-ftu/kidney-ascending-thin-loop-of-henle',
      crumbs: [
        { name: 'Apps', route: 'https://apps.humanatlas.io' },
        { name: 'Functional Tissue Unit Explorer' },
      ] satisfies BreadcrumbItem[],
    },
    resolve: {
      id: ftuResolver,
    },
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];
