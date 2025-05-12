import { Route } from '@angular/router';
import { ContentPageComponent } from './pages/content-page/content-page.component';
import { ContentPageDataSchema } from './pages/content-page/types/content-page.schema';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { PublicationsPageComponent } from './pages/publications-page/publications-page.component';
import { landingPageResolver } from './resolvers/landing-page/landing-page.resolver';
import { publicationsResolver } from './resolvers/publications-page/publications-page-resolver';
import { createYamlSpecResolver } from './resolvers/yaml-spec/yaml-spec.resolver';

/** Application routes */
export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingPageComponent,
    resolve: {
      data: landingPageResolver,
    },
  },
  {
    path: 'publications',
    component: PublicationsPageComponent,
    resolve: {
      publications: publicationsResolver,
    },
  },
  {
    path: '3d-reference-library',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/3d-reference-library-page/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
