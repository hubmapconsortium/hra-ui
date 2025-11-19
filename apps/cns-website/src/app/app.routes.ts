import { Route } from '@angular/router';
import { ContentPageComponent, ContentPageDataSchema } from '@hra-ui/design-system/content-templates/content-page';
import { createYamlSpecResolver } from '@hra-ui/design-system/content-templates/resolvers';
import { LandingPageComponent } from './pages/landing-page.component';
import { PeopleProfileComponent } from './pages/people-profile/people-profile.component';

/** Application routes */
export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingPageComponent,
  },
  {
    path: 'people/katy-borner',
    component: PeopleProfileComponent,
    // TODO: When JSON data is available, add resolver
    // resolve: {
    //   data: createJsonSpecResolver('assets/content/people/katy-borner/data.json', PeopleProfileDataSchema)
    // }
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
