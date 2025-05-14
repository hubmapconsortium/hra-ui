import { Route } from '@angular/router';

import { AboutPageComponent } from './pages/about-page/about-page.component';
import { ContentPageComponent } from './pages/content-page/content-page.component';
import { ContentPageDataSchema } from './pages/content-page/types/content-page.schema';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { PublicationsPageComponent } from './pages/publications-page/publications-page.component';
import { PublicationsPageDataSchema } from './pages/publications-page/publications-page.schema';
import { AboutPageResolver } from './resolvers/about-page/about-page.resolver';
import { landingPageResolver } from './resolvers/landing-page/landing-page.resolver';
import { createJsonSpecResolver } from './resolvers/spec.resolver';
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
    path: 'about',
    component: AboutPageComponent,
    resolve: {
      data: AboutPageResolver,
    },
  },
  {
    path: 'publications',
    component: PublicationsPageComponent,
    resolve: {
      publications: createJsonSpecResolver('https://cns.iu.edu/publications.json?sort=hra', PublicationsPageDataSchema),
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
    path: 'api',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/api-page/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'standard-operating-procedures',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver(
        'assets/content/standard-operating-procedures-page/data.yaml',
        ContentPageDataSchema,
      ),
    },
  },
  {
    path: 'vccf',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/vccf-page/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'training',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/training-page/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'ccf-ontology',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/ccf-ontology-page/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
