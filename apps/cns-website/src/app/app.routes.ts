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
  },
  // Dynamic route for future profile pages
  // When you create a team page, clicking on a person will navigate to /people/:slug
  // You'll need to create a component that loads profile data based on the slug
  // {
  //   path: 'people/:slug',
  //   component: PeopleProfileComponent,
  // },
];
