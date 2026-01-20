import { Route } from '@angular/router';
import { ContentPageDataSchema } from '@hra-ui/design-system/content-templates/content-page';
import { createYamlSpecResolver } from '@hra-ui/design-system/content-templates/resolvers';
import { NotFoundPageComponent } from '@hra-ui/design-system/error-pages/not-found-page';
import { ServerErrorPageComponent } from '@hra-ui/design-system/error-pages/server-error-page';
import { ContentPageComponent } from './components/content-page/content-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { PeopleProfileComponent } from './pages/people-profile/people-profile.component';
import { ResearchPageComponent } from './pages/research-page/research-page.component';
import { createFeaturedContentResolver } from './resolvers/featured-content/featured-content.resolver';
import { createPeopleProfileResolver } from './resolvers/people-profile/people-profile.resolver';
import { createResearchDataResolver } from './resolvers/research/research.resolver';
import { createTagsResolver } from './resolvers/tags/tags.resolver';

/** Application routes */
export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingPageComponent,
    resolve: {
      featuredContent: createFeaturedContentResolver(),
      tags: createTagsResolver(),
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
    path: 'people/:slug',
    component: PeopleProfileComponent,
    resolve: {
      data: createPeopleProfileResolver(),
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
    path: 'research',
    component: ResearchPageComponent,
    resolve: {
      data: createResearchDataResolver(),
    },
  },
  {
    path: 'visitor-info',
    component: ContentPageComponent,
    resolve: {
      data: createYamlSpecResolver('assets/content/visitor-info-page/data.yaml', ContentPageDataSchema),
    },
  },

  // Error pages
  {
    path: '500',
    component: ServerErrorPageComponent,
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];
