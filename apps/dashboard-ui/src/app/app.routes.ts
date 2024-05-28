import { Route } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';

export const appRoutes: Route[] = [
  { path: 'hra-landing', component: LandingComponent },
  { path: '**', component: LandingComponent },
];
