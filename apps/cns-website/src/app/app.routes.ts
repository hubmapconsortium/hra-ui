import { Route } from '@angular/router';
import { ContentPageComponent, ContentPageDataSchema } from '@hra-ui/design-system/content-templates/content-page';
import { createYamlSpecResolver } from '@hra-ui/design-system/content-templates/resolvers';
import { LandingPageComponent } from './pages/landing-page.component';
import { PeopleProfileComponent } from './pages/people-profile/people-profile.component';
import { peopleProfileResolver } from './resolvers/people-profile/people-profile.resolver';

/** Application routes */
export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingPageComponent,
  },
  {
    path: 'people/:slug',
    component: PeopleProfileComponent,
    resolve: {
      data: peopleProfileResolver,
    },
  },

  // Content pages
  // Please try to keep sorted in alphabetical order
  {
    path: 'about',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/about-page/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'amatria',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/amatria/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'jobs',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/jobs-page/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'privacy-policy',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/privacy-policy-page/data.yaml', ContentPageDataSchema),
    },
  },
  {
    path: 'visitor-info',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/visitor-info-page/data.yaml', ContentPageDataSchema),
    },
  },
];
