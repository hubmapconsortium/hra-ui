import { Route } from '@angular/router';
import { ContentPageComponent, ContentPageDataSchema } from '@hra-ui/design-system/content-templates/content-page';
import { createYamlSpecResolver } from '@hra-ui/design-system/content-templates/resolvers';
import { LandingPageComponent } from './pages/landing-page.component';

/** Application routes */
export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingPageComponent,
  },

  // Content pages
  // Please try to keep sorted in alphabetical order
  {
    path: 'jobs',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/jobs-page/data.yaml', ContentPageDataSchema),
    },
  },

  // Content pages
  // Please try to keep sorted in alphabetical order
  {
    path: 'visitor-info',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/visitor-info-page/data.yaml', ContentPageDataSchema),
    },
  },
];
