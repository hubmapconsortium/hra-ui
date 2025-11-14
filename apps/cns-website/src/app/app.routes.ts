import { Route } from '@angular/router';
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
];
