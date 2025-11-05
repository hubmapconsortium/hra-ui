import { Route } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page.component';
import { createYamlSpecResolver } from '@hra-ui/design-system/content-templates/resolvers';
import { ContentPageComponent, ContentPageDataSchema } from '@hra-ui/design-system/content-templates/content-page';

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
];
