import { Route } from '@angular/router';
import { MetadataPageComponent } from './pages/metadata-page/metadata-page.component';

/** Application routes */
export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: MetadataPageComponent,
  },
];
